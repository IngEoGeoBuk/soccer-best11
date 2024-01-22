import { useState, useEffect } from 'react';

import Image, { StaticImageData } from 'next/image';

import { Player } from '@prisma/client';

import usePostStore from '@/app/_store/post';
import Avatar from '@/public/images/avatar.png';

import '@/app/posts/styles.css';
import './playerBox.css';

const firebaseStorageUrl = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL;

function PlayerPaceImg({ src }: { src: string }) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      width={60}
      height={60}
      alt="player-box"
      onError={() => {
        setImgSrc(Avatar);
      }}
    />
  );
}

function SelectedPlayerBox({ value }: { value: number }) {
  const { selectedCard, updateSelectedCard, selectedPlayers } = usePostStore(
    (store) => store,
  );

  const player = selectedPlayers[value];
  if (player) {
    return (
      <button
        type="button"
        onClick={() => updateSelectedCard(value)}
        className={
          selectedCard === value ? 'player-card-selected' : 'player-card'
        }
        data-testid={`selected-player-${value}`}
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
        <p className="player-box-name-paragraph">{player.name}</p>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => updateSelectedCard(value)}
      className={
        selectedCard === value ? 'player-card-selected' : 'player-card'
      }
      data-testid={`selected-player-${value}`}
    >
      <div className="w-[36px] h-[36px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" />
      <Image src={Avatar} width={60} height={60} alt="empty-player" />
      <p className="player-box-name-paragraph">Name</p>
    </button>
  );
}

function ListPlayerBox({ player }: { player: Player }) {
  const {
    selectedCard,
    updateSelectedCard,
    selectedPlayers,
    updateSelectedPlayers,
    updateToastMessage,
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
      data-testid={`list-player-${player.id}`}
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
      <p className="player-box-name-paragraph">{player.name}</p>
    </button>
  );
}

function ViewPlayerBox({ player }: { player: Player }) {
  return (
    <button
      type="button"
      className="player-card cursor-default"
      data-testid={`view-player-${player.id}`}
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
      <p className="player-box-name-paragraph">{player.name}</p>
    </button>
  );
}

export { ListPlayerBox, SelectedPlayerBox, ViewPlayerBox };
