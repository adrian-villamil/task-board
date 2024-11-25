'use server';

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { getLastUUIDSegment } from "@/utils/get-last-uuid-segment";

export const DeleteTaskById = async (id: string) => {
  try {
    await db.delete(tasksTable).where(eq(tasksTable.id, id));

    revalidatePath('/board/[id]', 'page');

    return {
      ok: true,
      message: `The task with id ${getLastUUIDSegment(id)} was deleted successfully.`,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Couldn't delete the task with id ${getLastUUIDSegment(id)}.`,
    };
  }
};