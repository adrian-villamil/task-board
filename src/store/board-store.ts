import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  boardId: string | null;
  setBoardId: (id: string) => void;
  getBoardId: () => string | null;
}

export const useBoardStore = create<Store>()(
  persist((set, get) => ({
    boardId: null,
    setBoardId: (id: string) => set({ boardId: id }),
    getBoardId: () => {
      const { boardId } = get();
      return boardId
    },
  }), { name: 'task-board-id' })
);