import { Player } from '@prisma/client';
import { create } from 'zustand';

type State = {
  selectedCard: number;
  selectedPlayers: (Player | null)[];
  toastMessage: string;
};

type Action = {
  updateSelectedCard: (selectedCard: State['selectedCard']) => void
  updateSelectedPlayers: (selectedPlayers: State['selectedPlayers']) => void;
  updateToastMessage: (toastMessage: State['toastMessage']) => void;
  resetPost: () => void;
};

const initialState: State = {
  selectedCard: -1,
  selectedPlayers: Array.from({ length: 11 }, () => null),
  toastMessage: '',
};

const usePostStore = create<State & Action>((set) => ({
  ...initialState,
  updateSelectedCard: (selectedCard) => set(() => ({ selectedCard })),
  updateSelectedPlayers: (selectedPlayers) => set(() => ({ selectedPlayers })),
  updateToastMessage: (toastMessage) => set(() => ({ toastMessage })),
  resetPost: () => {
    set(initialState);
  },
}));

export default usePostStore;
