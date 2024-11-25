import { TaskListItem } from "./task-list-item";
import { getTasksByBoardId } from "@/actions/task/get-tasks-by-board-id";

interface Props {
  boardId: string;
}

export const TaskList = async ({ boardId }: Props) => {
  const response = (await getTasksByBoardId(boardId));

  if (!response.ok) return null;

  return (
    <div className="flex flex-col gap-y-5">
      {response.tasks && response.tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
};