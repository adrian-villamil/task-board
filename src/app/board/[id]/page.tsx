import { redirect } from "next/navigation";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import { getBoardInfoById } from "@/actions/board/get-board-info-by-id";
import { CreateTaskButton } from "@/components/create-task-button";
import { EditBoardButton } from "@/components/edit-board-button";
import { TaskListSkeleton } from "@/components/skeletons";
import { TaskList } from "@/components/task-list";

const outfitFont = Outfit({
  subsets: ['latin'],
});

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoardPage({ params }: Props) {
  const id = (await params).id;
  const result = await getBoardInfoById(id);

  if (!result.ok) {
    redirect('/');
  };

  return (
    <main className={`min-h-screen py-[54px] ${outfitFont.className} bg-[#F8FAFC]`}>
      <div className='max-w-[584px] mx-auto px-4 space-y-[38px]'>
        <div className='pl-[52px] space-y-[15px] bg-[url("/Logo.svg")] bg-[position:left_top] bg-no-repeat'>
          <div className='flex justify-start items-center gap-1'>
            <h1 className='text-[40px] leading-none'>{result.board?.name}</h1>
            <EditBoardButton />
          </div>
          <p className='font-medium'>{result.board?.description}</p>
        </div>
        <div className="space-y-5">
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList boardId={result.board?.id!} />
          </Suspense>
          <CreateTaskButton boardId={result.board?.id!} />
        </div>
      </div>
    </main>
  );
};