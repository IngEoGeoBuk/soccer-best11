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
      <div
        id="playerListSection"
        className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul className="flex flex-wrap -mb-px">
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
        <ul className="flex flex-wrap -mb-px">
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-1">
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
