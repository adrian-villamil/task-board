import { create } from "zustand";

export interface State {
  isOpenEditModal: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isOpenEditModal: false,
  openEditModal: () => set({ isOpenEditModal: true }),
  closeEditModal: () => set({ isOpenEditModal: false }),
}));