'use server';

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";

export const CreateNewTaskByBoardId = async (id: string) => {
  try {
    await db.insert(tasksTable).values({
      name: 'New Task',
      icon: 'man-working',
      boardId: id,
    });

    revalidatePath('/board/[id]', 'page');

    return {
      ok: true,
      message: 'New task added to your board.',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Failed to create a new task.',
    };
  }
};