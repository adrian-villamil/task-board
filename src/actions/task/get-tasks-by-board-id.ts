'use server';

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tasksTable } from "@/db/schema";
import { getLastUUIDSegment } from "@/utils/get-last-uuid-segment";

export const getTasksByBoardId = async (boardId: string) => {
  try {
    const tasks = await db.select().from(tasksTable).where(eq(tasksTable.boardId, boardId));

    return {
      ok: true,
      tasks,
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Board with id ${getLastUUIDSegment(boardId)} has not tasks.`,
    }
  }
}