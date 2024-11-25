'use client';

import Image from "next/image";
import clsx from "clsx";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { editBoardById } from "@/actions/board/edit-board-by-id";
import { useBoardFormStore } from "@/store/board-form-store";
import { useUIStore } from "@/store/ui-store";
import type { Board } from "@/interfaces/board.interface";

export const ModalBoardEditor = () => {
  const isOpenBoardModal = useUIStore(state => state.isOpenBoardModal);
  const closeBoardModal = useUIStore(state => state.closeBoardModal);

  return (
    <div>
      {isOpenBoardModal && <div onClick={closeBoardModal} className="fade-in fixed top-0 left-0 z-10 w-full h-full bg-[#00000033]"></div>}
      {isOpenBoardModal && (
        <div className="fixed top-[14px] right-[14px] z-20 w-[626px] max-w-[calc(100%-28px)] px-[22px] py-4 rounded-xl space-y-2 bg-white">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Board details</h1>
            <button
              onClick={closeBoardModal}
              className="w-9 h-9 border rounded-lg bg-[url('/close_ring_duotone-1.svg')] bg-center bg-no-repeat hover:bg-slate-200"
            >
            </button>
          </div>
          <Form />
        </div>
      )}
    </div>
  );
};

const Form = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Board>();
  const board = useBoardFormStore(state => state.board);
  const setBoard = useBoardFormStore(state => state.setBoard);
  const closeBoardModal = useUIStore(state => state.closeBoardModal);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!board) return null;

    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const onSubmit: SubmitHandler<Board> = async (data) => {
    if (!board) return;

    const result = await editBoardById(board.id, data);

    if (!result.ok) toast.error(result.message);
    toast.success(result.message);
    closeBoardModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <label className="w-full text-xs font-medium text-[#97A3B6]">Board name</label>
        <input
          type="text"
          placeholder="Enter a name"
          className="w-full px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3]"
        {...register('name', { value: board?.name, onChange: handleInputChange, required: true })}
        />
        {errors.name?.type === 'required' && <p className="absolute top-full left-0 text-sm text-red-500">Name is required</p>}
      </div>
      <div>
        <label className="w-full text-xs font-medium text-[#97A3B6]">Description</label>
        <textarea
          placeholder="Enter a short description"
          className="w-full h-44 px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3] resize-none"
        {...register('description', { value: board?.description, onChange: handleInputChange })}
        >
        </textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "px-6 py-2 flex items-center gap-x-2 rounded-3xl text-sm text-white bg-[#3662E3]",
            isSubmitting && "bg-[#3661e3d5]"
          )}
        >
          Update
          {isSubmitting ? (
            <Image
              src={'/loader.svg'}
              alt="loader-icon"
              width={20}
              height={20}
              className="animate-spin"
            />
          ) : (
            <Image
              src={'/Done_round.svg'}
              alt="done-icon"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>
    </form>
  );
};