import React from 'react';
import { Player } from '@prisma/client';
import { ViewPlayerBox } from '@/app/posts/components/playerBox';

function ViewPlayersSection({ players } : { players: Player[] }) {
  return (
    <section>
      <div className="flex justify-center py-2 gap-4">
        <ViewPlayerBox player={players[0]} />
        <ViewPlayerBox player={players[1]} />
        <ViewPlayerBox player={players[2]} />
      </div>
      <div className="flex justify-center py-2 gap-4">
        <ViewPlayerBox player={players[3]} />
        <ViewPlayerBox player={players[4]} />
        <ViewPlayerBox player={players[5]} />
      </div>
      <div className="flex justify-center py-2 gap-4">
        <ViewPlayerBox player={players[6]} />
        <ViewPlayerBox player={players[7]} />
        <ViewPlayerBox player={players[8]} />
        <ViewPlayerBox player={players[9]} />
      </div>
      <div className="flex justify-center py-2 gap-4">
        <ViewPlayerBox player={players[10]} />
      </div>
    </section>
  );
}

export default ViewPlayersSection;
