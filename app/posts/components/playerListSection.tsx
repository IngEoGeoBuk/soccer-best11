'use client';

import { useState } from 'react';

import AlertBox from '@/app/_components/common/alertBox';
import ToastBox from '@/app/_components/common/toastBox';
import Club from '@/app/_constants/Club';
import National from '@/app/_constants/National';
import usePlayersQuery from '@/app/_hooks/useQuery/usePlayersQuery';
import usePostStore from '@/app/_store/post';

import { ListPlayerBox } from './playerBox';
import PlayerListSectionSkeleton from './playerListSectionSkeleton';

import '@/app/posts/styles.css';
import './styles.css';

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
        <ul className="player-list">
          {National.map((item, key) => (
            <li className="mr-2" key={item}>
              <button
                data-testid={`national-${item}`}
                type="button"
                className={
                  national === key ? 'player-tab-selected' : 'player-tab'
                }
                onClick={() => {
                  setNational(key);
                  setClub(0);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <ul className="player-list">
          {Club[national].map((item, key) => (
            <li className="mr-2" key={item}>
              <button
                data-testid={`club-${item}`}
                type="button"
                className={club === key ? 'player-tab-selected' : 'player-tab'}
                onClick={() => {
                  setClub(key);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <br />
        {toastMessage && (
          <ToastBox
            message={toastMessage}
            clickClose={() => updateToastMessage('')}
          />
        )}
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
