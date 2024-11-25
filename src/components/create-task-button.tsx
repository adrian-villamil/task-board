'use client';

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { CreateNewTaskByBoardId } from "@/actions/task/create-new-task-by-board-id";

interface Props {
  boardId: string;
}

export const CreateTaskButton = ({ boardId }: Props) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await CreateNewTaskByBoardId(boardId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full p-4 flex items-center gap-x-5 rounded-2xl border border-[#E3E8EF] bg-[#F5E8D5] cursor-pointer",
        pending && "bg-[#f5e8d5b7]"
      )}
    >
      <div className={clsx(
        "w-11 h-11 rounded-xl bg-[#E9A23B] bg-[url('/Add_round_duotone.svg')] bg-center bg-no-repeat",
        pending && "bg-[#e9a33bcb]"
      )}></div>
      <h2 className="font-semibold">Add new task</h2>
    </button>
  );
};