import { Task } from "@/interfaces/task.interface";
import { create } from "zustand";

interface State {
  currentTask: Task | null;
  setCurrentTask: (task: Task) => void;
  getCurrentTask: () => Task | null;
}

export const useTaskFormStore = create<State>()((set, get) => ({
  currentTask: null,
  setCurrentTask: (task: Task) => set({ currentTask: task }),
  getCurrentTask: () => {
    const { currentTask } = get();
    return currentTask;
  }
}));