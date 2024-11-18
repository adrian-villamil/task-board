'use client';

import { useUIStore } from "@/store/ui-store";
import { TaskAsideForm } from "./task-aside-form";

export const TaskAside = () => {
  const isOpenEditModal = useUIStore(state => state.isOpenEditModal);
  const closeEditModal = useUIStore(state => state.closeEditModal);

  return (
    <div>
      {isOpenEditModal && <div onClick={closeEditModal} className="fade-in fixed top-0 left-0 z-10 w-full h-full bg-[#00000033]"></div>}
      {isOpenEditModal && (
        <div className="fixed top-[14px] right-[14px] z-20 w-[626px] max-w-[calc(100%-28px)] px-[22px] py-4 rounded-xl space-y-2 bg-white">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Task details</h1>
            <button
              onClick={closeEditModal}
              className="w-9 h-9 border rounded-lg bg-[url('/close_ring_duotone-1.svg')] bg-center bg-no-repeat hover:bg-slate-200"
            >
            </button>
          </div>
          <TaskAsideForm />
        </div>
      )}
    </div>
  );
};