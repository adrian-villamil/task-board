'use server';

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { getLastUUIDSegment } from "@/utils/get-last-uuid-segment";
import type { Task } from "@/interfaces/task.interface";

export const EditTaskById = async (id: string, task: Task) => {
  try {
    await db.update(tasksTable).set(task).where(eq(tasksTable.id, id));

    revalidatePath('/board/[id]', 'page');

    return {
      ok: true,
      message: `Task with id ${getLastUUIDSegment(id)} was updated successfully`,
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Couldn't update task with id ${getLastUUIDSegment(id)}`,
    }
  }
};