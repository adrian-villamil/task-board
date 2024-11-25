import { create } from "zustand";

export interface State {
  isOpenTaskModal: boolean;
  isOpenBoardModal: boolean;
  openTaskModal: () => void;
  openBoardModal: () => void;
  closeTaskModal: () => void;
  closeBoardModal: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isOpenTaskModal: false,
  isOpenBoardModal: false,
  openTaskModal: () => set({ isOpenTaskModal: true }),
  openBoardModal: () => set({ isOpenBoardModal: true }),
  closeTaskModal: () => set({ isOpenTaskModal: false }),
  closeBoardModal: () => set({ isOpenBoardModal: false }),
}));