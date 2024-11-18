'use client';

import type { Task, TaskIcon } from "@/interfaces/task.interface";
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
  const openEditModal = useUIStore(state => state.openEditModal);

  return (
    <div
      onClick={openEditModal}
      className={clsx(
        "p-4 rounded-2xl flex items-center gap-x-5 cursor-pointer bg-[#E3E8EF]",
        task.status === 'in-progress' && "bg-[#F5D565]",
        task.status === 'completed' && "bg-[#A0ECB1]",
        task.status === 'wont-do' && "bg-[#F7D4D3]"
      )}
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