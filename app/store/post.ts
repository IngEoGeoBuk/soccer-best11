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
};

const usePostStore = create<State & Action>((set) => ({
  selectedCard: -1,
  selectedPlayers: Array.from({ length: 11 }, () => null),
  toastMessage: '',
  updateSelectedCard: (selectedCard) => set(() => ({ selectedCard })),
  updateSelectedPlayers: (selectedPlayers) => set(() => ({ selectedPlayers })),
  updateToastMessage: (toastMessage) => set(() => ({ toastMessage })),
}));

export default usePostStore;
