'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  useQuery,
} from '@tanstack/react-query';
import { Player } from '@prisma/client';
import AlertBox from '@/app/components/common/alertBox';
import ToastBox from '@/app/components/common/toastBox';
import { usePost } from '@/app/context/post.provider';
import { ListPlayerBox } from './playerBox';
import PlayerListSectionSkeleton from './playerListSectionSkeleton';

const National = ['ENG', 'ESP', 'ITA', 'GER', 'NED', 'FRA', 'POR'];
const Club = [
  ['MCI', 'LIV', 'ARS', 'CHE', 'MUN'],
  ['MAD', 'FCB', 'ATM'],
  ['INT', 'JUV', 'MIL', 'NAP', 'ROM'],
  ['BAY', 'DOR', 'RBL'],
  ['AJA', 'PSV', 'FEY'],
  ['PSG', 'LYO', 'OLM'],
  ['POR', 'SLB', 'SLI'],
];

async function getPlayersByClub(club: string) {
  const { data } = await axios.get(`/api/players?club=${club}`);
  return data;
}

function PlayerListSection() {
  const { toastMessage, setToastMessage } = usePost();
  const [national, setNational] = useState<number>(0);
  const [club, setClub] = useState<number>(0);

  const {
    data, error, status, isFetching,
  } = useQuery<Player[]>({
    queryKey: ['players', Club[national][club]],
    queryFn: () => getPlayersByClub(Club[national][club]),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    staleTime: 5000,
  });

  if (status === 'loading' || isFetching) {
    return <PlayerListSectionSkeleton />;
  }

  if (status === 'error' || error) {
    return <AlertBox />;
  }

  if (status === 'success' && data) {
    return (
      <div id="playerListSection" className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {National.map((item, key) => (
            <li className="mr-2" key={item}>
              <button
                type="button"
                className={national === key ? 'player-tab-selected' : 'player-tab'}
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
        {toastMessage
          && <ToastBox message={toastMessage} clickClose={() => setToastMessage('')} />}
        <div className="w-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-1">
            {data.map((item) => (
              <ListPlayerBox
                key={item.id}
                player={item}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerListSection;
