import React from 'react';
import Image from 'next/image';
import { Player } from '@prisma/client';
import { usePost } from '@/app/context/post-context';

function SelectedPlayerBox({ value } : { value: number }) {
  const { selectedCard, setSelectedCard, selectedPlayers } = usePost();

  const player = selectedPlayers[value];
  if (player) {
    return (
      <button
        type="button"
        onClick={() => setSelectedCard(value)}
        className={selectedCard === value ? 'player-card-selected' : 'player-card'}
      >
        <Image
          src={`/images/club/${player.club}.png`}
          width={36}
          height={36}
          alt={player.club}
        />
        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/soccer-best11.appspot.com/o/face%2F${player.id}.png?alt=media`}
          width={60}
          height={60}
          alt={String(player.club)}
        />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {player.name}
        </p>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setSelectedCard(value)}
      className={selectedCard === value ? 'player-card-selected' : 'player-card'}
    >
      <div
        className="w-[36px] h-[36px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      />
      <Image
        src="/images/avatar.png"
        width={60}
        height={60}
        alt="emypt-player"
      />
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Name
      </p>
    </button>
  );
}

function ListPlayerBox({ player } : { player: Player }) {
  const {
    selectedCard, setSelectedCard, selectedPlayers, setSelectedPlayers, setToastMessage,
  } = usePost();

  const clickFnc = () => {
    if (selectedCard === -1) {
      setToastMessage('Please select a position card first.');
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
      return;
    }
    if (selectedPlayers.includes(player)) {
      setToastMessage('You have already chosen the player.');
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
      return;
    }

    const newArray = [...selectedPlayers];
    newArray[selectedCard] = player;
    setSelectedPlayers(newArray);
    setSelectedCard(-1);
  };

  return (
    <button
      type="button"
      onClick={() => clickFnc()}
      className="player-card"
    >
      <Image
        src={`/images/club/${player.club}.png`}
        width={36}
        height={36}
        alt={player.club}
      />
      <Image
        src={`https://firebasestorage.googleapis.com/v0/b/soccer-best11.appspot.com/o/face%2F${player.id}.png?alt=media`}
        width={60}
        height={60}
        alt={String(player.club)}
      />
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {player.name}
      </p>
    </button>
  );
}

function ViewPlayerBox({ player } : { player: Player }) {
  return (
    <button
      type="button"
      className="player-card cursor-default"
    >
      <Image
        src={`/images/club/${player.club}.png`}
        width={36}
        height={36}
        alt={player.club}
      />
      <Image
        src={`https://firebasestorage.googleapis.com/v0/b/soccer-best11.appspot.com/o/face%2F${player.id}.png?alt=media`}
        width={60}
        height={60}
        alt={String(player.club)}
      />
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {player.name}
      </p>
    </button>
  );
}

export { ListPlayerBox, SelectedPlayerBox, ViewPlayerBox };
