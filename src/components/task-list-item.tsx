'use client';

import type { Task, TaskIcon } from "@/interfaces/task.interface";
import { useTaskFormStore } from "@/store/task-form-store";
import { useUIStore } from "@/store/ui-store";
import clsx from "clsx";

const getTaskIcon: Record<TaskIcon, string> = {
  "man-working": "👨🏻‍💻",
  "dialog": "🗨️",
  "coffee": "☕",
  "weightlifter": "🏋🏻‍♂️",
  "books": "📚",
  "clock": "⏰",
};

interface Props {
  task: Task;
}

export const TaskListItem = ({ task }: Props) => {
  const openTaskModal = useUIStore(state => state.openTaskModal);
  const setCurrentTask = useTaskFormStore(state => state.setCurrentTask);

  const handleClick = () => {
    setCurrentTask(task);
    openTaskModal();
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "p-4 rounded-2xl flex items-center gap-x-5 cursor-pointer focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-[#3662E3]",
        task.status === 'in-progress' && "bg-[#F5D565]",
        task.status === 'completed' && "bg-[#A0ECB1]",
        task.status === 'wont-do' && "bg-[#F7D4D3]",
        task.status ?? 'bg-[#E3E8EF]'
      )}
      tabIndex={0}
    >
      <div className="w-11 h-11 flex justify-center items-center text-2xl rounded-xl bg-white">{getTaskIcon[task.icon]}</div>
      <div className="flex flex-col flex-1">
        <h1 className="text-xl font-semibold">{task.name}</h1>
        <p className="font-light">{task.description}</p>
      </div>
      <div className={clsx(
        "w-11 h-11 rounded-xl bg-center bg-no-repeat",
        task.status === 'in-progress' && "bg-[#E9A23B] bg-[url('/Time_atack_duotone.svg')]",
        task.status === 'completed' && "bg-[#32D657] bg-[url('/Done_round_duotone.svg')]",
        task.status === 'wont-do' && "bg-[#DD524C] bg-[url('/close_ring_duotone.svg')]",
      )}></div>
    </div>
  );
};