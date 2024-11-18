import { Task } from "@/interfaces/task.interface";
import { randomUUID } from "crypto";
import { TaskListItem } from "./task-list-item";

const tasks: Task[] = [
  {
    id: randomUUID(),
    name: 'Task in Progress',
    description: null,
    icon: 'clock',
    status: 'in-progress',
  },
  {
    id: randomUUID(),
    name: 'Task Completed',
    description: null,
    icon: 'weightlifter',
    status: 'completed',
  },
  {
    id: randomUUID(),
    name: "Task Won't Do",
    description: null,
    icon: 'coffee',
    status: 'wont-do',
  },
  {
    id: randomUUID(),
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    icon: 'books',
    status: null,
  },
];

export const TaskList = () => {
  return (
    <div className="flex flex-col gap-y-5">
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
      <div className="p-4 flex items-center gap-x-5 rounded-2xl border border-[#E3E8EF] bg-[#F5E8D5] cursor-pointer">
        <div className="w-11 h-11 rounded-xl bg-[#E9A23B] bg-[url('/Add_round_duotone.svg')] bg-center bg-no-repeat"></div>
        <h2 className="font-semibold">Add new task</h2>
      </div>
    </div>
  );
};