'use server';

import { db } from "@/db";
import { boardsTable, tasksTable } from "@/db/schema";
import { seedBoard, seedTasks } from "@/seed/seed-board";

type NewTask = typeof tasksTable.$inferInsert;

export const createNewBoard = async () => {
  try {
    const boardId = await db.transaction(async (tx) => {
      const boardInserted = await tx.insert(boardsTable).values(seedBoard).returning({ boardId: boardsTable.id });
      const boardId = boardInserted[0].boardId;
      const tasksToInser: NewTask[] = seedTasks.map((task) => ({ ...task, boardId }));
      await tx.insert(tasksTable).values(tasksToInser);

      return boardId;
    });
    return {
      ok: true,
      boardId,
    }
  } catch (error) {
    return {
      ok: false,
      message: "Couldn't create a board",
    }
  }
};