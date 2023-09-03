import React from 'react';
import { SelectedPlayerBox } from './playerBox';

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

function PlayerListSectionSkeleton() {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {National.map((item) => (
          <li className="mr-2" key={item}>
            <button
              type="button"
              className="player-tab"
              onClick={() => {}}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap -mb-px">
        {Club[0].map((item) => (
          <li className="mr-2" key={item}>
            <button
              type="button"
              className="player-tab"
              onClick={() => {}}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <br />
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-1">
          {Array(10).fill('d').map((_, index) => index + 1).map((value, key) => (
            <SelectedPlayerBox key={value} value={key} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerListSectionSkeleton;
