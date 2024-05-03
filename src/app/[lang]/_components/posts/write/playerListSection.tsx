'use client';

import { useState } from 'react';

import AlertBox from '@components/common/alertBox';
import ToastBox from '@components/common/toastBox';
import { ListPlayerBox } from '@components/posts/common/playerBox';
import Club from '@constants/Club';
import National from '@constants/National';
import usePlayersQuery from '@hooks/useQuery/usePlayersQuery';
import usePostStore from '@stores/post';

import PlayerListSectionSkeleton from './playerListSectionSkeleton';

import '@lang/posts/styles.css';
import '@components/posts/common/styles.css';

function NationalTab({
  national,
  clickFunc,
}: {
  national: number;
  clickFunc: (key: number) => void;
}) {
  return (
    <ul className="player-list">
      {National.map((item, key) => (
        <li className="mr-2" key={item}>
          <button
            data-testid={`national-${item}`}
            type="button"
            className={national === key ? 'player-tab-selected' : 'player-tab'}
            onClick={() => clickFunc(key)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ClubTab({
  club,
  clubList,
  clickFunc,
}: {
  club: number;
  clubList: string[];
  clickFunc: (key: number) => void;
}) {
  return (
    <ul className="player-list">
      {clubList.map((item, key) => (
        <li className="mr-2" key={item}>
          <button
            data-testid={`club-${item}`}
            type="button"
            className={club === key ? 'player-tab-selected' : 'player-tab'}
            onClick={() => {
              clickFunc(key);
            }}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PlayerListSection() {
  const { toastMessage, updateToastMessage } = usePostStore((store) => store);

  const [national, setNational] = useState<number>(3);
  const [club, setClub] = useState<number>(0);

  const { data, error, status, isFetching } = usePlayersQuery(national, club);

  if (status === 'pending' || isFetching) {
    return <PlayerListSectionSkeleton />;
  }

  if (status === 'error' || error) {
    return <AlertBox />;
  }

  if (status === 'success' && data) {
    return (
      <div id="playerListSection" className="player-list-section">
        <NationalTab
          national={national}
          clickFunc={(key) => {
            setNational(key);
            setClub(0);
          }}
        />
        <ClubTab
          club={club}
          clubList={Club[national]}
          clickFunc={(key) => setClub(key)}
        />
        <br />
        <ToastBox
          message={toastMessage}
          clickClose={() => updateToastMessage('')}
        />
        <div className="w-full">
          <div className="player-box-container">
            {data.map((item) => (
              <ListPlayerBox key={item.id} player={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PlayerListSection;
