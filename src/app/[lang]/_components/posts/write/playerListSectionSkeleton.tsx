import { SelectedPlayerBox } from '@components/posts/common/playerBox';
import Club from '@constants/Club';
import National from '@constants/National';

import '@lang/posts/styles.css';
import '@components/posts/common/styles.css';

function PlayerListSectionSkeleton() {
  return (
    <div className="player-list-section">
      <ul className="player-list">
        {National.map((item) => (
          <li className="mr-2" key={item}>
            <button type="button" className="player-tab" onClick={() => {}}>
              {item}
            </button>
          </li>
        ))}
      </ul>
      <ul className="player-list">
        {Club[0].map((item) => (
          <li className="mr-2" key={item}>
            <button type="button" className="player-tab" onClick={() => {}}>
              {item}
            </button>
          </li>
        ))}
      </ul>
      <br />
      <div className="w-full">
        <div className="player-box-container">
          {Array(10)
            .fill('d')
            .map((_, index) => index + 1)
            .map((value, key) => (
              <SelectedPlayerBox key={value} value={key} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerListSectionSkeleton;
