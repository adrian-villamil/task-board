'use client';

import { createNewBoard } from '@/actions/board/create-new-board';
import { useBoardStore } from '@/store/board-store';
import { Outfit } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const outfitFont = Outfit({
  subsets: ['latin'],
});

export default function HomePage() {
  const getBoardId = useBoardStore((state) => state.getBoardId);
  const setBoardId = useBoardStore((state) => state.setBoardId);
  const boardId = getBoardId();
  const router = useRouter();

  useEffect(() => {
    const initializeBoard = async () => {
      if (!boardId) {
        try {
          const response = await createNewBoard();
          if (response.ok) {
            setBoardId(response.boardId!);
            router.push(`/board/${response.boardId}`);
          }
          return;
        } catch (error) {
          console.log(error);
        }
      }
      router.push(`/board/${boardId}`);
    };
    initializeBoard();
  }, []);

  return (
    <main className={`min-h-screen pt-[54px] ${outfitFont.className} bg-[#F8FAFC]`}>
    </main>
  );
}
