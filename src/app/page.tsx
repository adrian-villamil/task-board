import { TaskList } from '@/components/task-list';
import { Outfit } from 'next/font/google';

const outfitFont = Outfit({
  subsets: ['latin'],
});

export default function HomePage() {
  return (
    <main className={`min-h-screen pt-[54px] ${outfitFont.className} bg-[#F8FAFC]`}>
      <div className='max-w-[584px] mx-auto px-4 space-y-[38px]'>
        <div className='pl-[52px] space-y-[15px] bg-[url("/Logo.svg")] bg-[position:left_top] bg-no-repeat'>
          <div className='flex justify-start items-center gap-1'>
            <h1 className='text-[40px] leading-none'>My Task Board</h1>
            <button className='w-10 h-10 flex justify-center items-center rounded-lg hover:bg-slate-200 bg-[url("/Edit_duotone.svg")] bg-center bg-no-repeat'></button>
          </div>
          <p className='font-medium'>Tasks to keep organised</p>
        </div>
        <TaskList />
      </div>
    </main>
  );
}
