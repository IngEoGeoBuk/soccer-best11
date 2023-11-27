import React from 'react';
import Image from 'next/image';
import { Player } from '@prisma/client';
import usePostStore from '@/app/store/post';

const firebaseStorageUrl = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL;

function PlayerPaceImg({ src } : { src: string }) {
  return (
    <Image
      src={src}
      width={60}
      height={60}
      alt="player-box"
    />
  );
}

function SelectedPlayerBox({ value } : { value: number }) {
  const { selectedCard, updateSelectedCard, selectedPlayers } = usePostStore((store) => store);

  const player = selectedPlayers[value];
  if (player) {
    return (
      <button
        type="button"
        onClick={() => updateSelectedCard(value)}
        className={selectedCard === value ? 'player-card-selected' : 'player-card'}
      >
        <Image
          src={`/images/club/${player.club}.png`}
          width={36}
          height={36}
          alt={player.club}
        />
        <PlayerPaceImg
          src={`${firebaseStorageUrl}/o/face%2F${player.id}.png?alt=media`}
        />
        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          {player.name}
        </p>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => updateSelectedCard(value)}
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
      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
        Name
      </p>
    </button>
  );
}

function ListPlayerBox({ player } : { player: Player }) {
  const {
    selectedCard, updateSelectedCard, selectedPlayers, updateSelectedPlayers, updateToastMessage,
  } = usePostStore((store) => store);

  const clickFnc = () => {
    if (selectedCard === -1) {
      updateToastMessage('Please select a position card first.');
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        updateToastMessage('');
      }, 2000);
      return;
    }
    if (selectedPlayers.includes(player)) {
      updateToastMessage('You have already chosen the player.');
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        updateToastMessage('');
      }, 2000);
      return;
    }

    const newArray = [...selectedPlayers];
    newArray[selectedCard] = player;
    updateSelectedPlayers(newArray);
    updateSelectedCard(-1);
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
      <PlayerPaceImg
        src={`${firebaseStorageUrl}/o/face%2F${player.id}.png?alt=media`}
      />
      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
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
      <PlayerPaceImg
        src={`${firebaseStorageUrl}/o/face%2F${player.id}.png?alt=media`}
      />
      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
        {player.name}
      </p>
    </button>
  );
}

export { ListPlayerBox, SelectedPlayerBox, ViewPlayerBox };
