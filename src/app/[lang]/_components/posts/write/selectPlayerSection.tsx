'use client';

import { SelectedPlayerBox } from '@components/posts/common/playerBox';

import '@lang/posts/styles.css';

function SelectPlayerSection() {
  return (
    <section>
      <div className="select-player-section-box">
        <SelectedPlayerBox value={0} />
        <SelectedPlayerBox value={1} />
        <SelectedPlayerBox value={2} />
      </div>
      <div className="select-player-section-box">
        <SelectedPlayerBox value={3} />
        <SelectedPlayerBox value={4} />
        <SelectedPlayerBox value={5} />
      </div>
      <div className="select-player-section-box">
        <SelectedPlayerBox value={6} />
        <SelectedPlayerBox value={7} />
        <SelectedPlayerBox value={8} />
        <SelectedPlayerBox value={9} />
      </div>
      <div className="select-player-section-box">
        <SelectedPlayerBox value={10} />
      </div>
    </section>
  );
}

export default SelectPlayerSection;
