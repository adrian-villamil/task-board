export const TaskListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-5">
      {Array.from({length:4}).map((_, i) => (
        <div key={i} className="h-[76px] rounded-2xl bg-slate-300 animate-pulse"></div>
      ))}
    </div>
  );
};