import { Player } from '@prisma/client';
import React, {
  useState, useMemo, createContext, useContext,
} from 'react';

interface Interface {
  selectedCard: number;
  setSelectedCard: (value: number) => void;
  selectedPlayers: (Player | null)[];
  setSelectedPlayers: (value: (Player | null)[]) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
}

const PostContext = createContext<Interface>({
  selectedCard: -1,
  setSelectedCard: () => {},
  selectedPlayers: Array.from({ length: 11 }, () => null),
  setSelectedPlayers: () => {},
  toastMessage: '',
  setToastMessage: () => {},
});

function PostProvider(props: any) {
  const [selectedCard, setSelectedCard] = useState<number>(-1);
  const [selectedPlayers, setSelectedPlayers] = useState<(Player | null)[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');

  const value = useMemo(
    () => ({
      selectedCard,
      setSelectedCard,
      selectedPlayers,
      setSelectedPlayers,
      toastMessage,
      setToastMessage,
    }),
    [selectedCard, selectedPlayers, toastMessage],
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <PostContext.Provider value={value} {...props} />;
}

const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error(
      'usePost must be used in within a PostProvider',
    );
  }
  return context;
};

export { usePost, PostProvider };
