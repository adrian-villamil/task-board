'use client';

import { getBoardInfoById } from "@/actions/board/get-board-info-by-id";
import { useBoardFormStore } from "@/store/board-form-store";
import { useBoardStore } from "@/store/board-store";
import { useUIStore } from "@/store/ui-store";

export const EditBoardButton = () => {
  const openBoardModal = useUIStore(state => state.openBoardModal);
  const boardId = useBoardStore(state => state.boardId);
  const setBoard = useBoardFormStore(state => state.setBoard);

  const setCurrentBoard = async () => {
    if (!boardId) return null;
    const result = await getBoardInfoById(boardId);
    if (!result.ok) return null;
    setBoard(result.board!);
    openBoardModal();
  };
  
  const handleClick = () => {
    setCurrentBoard();
  };

  return (
    <button
      onClick={handleClick}
      className='w-10 h-10 flex justify-center items-center rounded-lg hover:bg-slate-200 bg-[url("/Edit_duotone.svg")] bg-center bg-no-repeat'
    >
    </button>
  );
};