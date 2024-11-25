import { create } from "zustand";
import { Board } from "@/interfaces/board.interface";

interface State {
  board: Board | null;
  setBoard: (board: Board) => void;
}

export const useBoardFormStore = create<State>()((set) => ({
  board: null,
  setBoard: (board: Board) => set({ board }),
}));