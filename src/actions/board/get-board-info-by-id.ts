'use server';

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { boardsTable } from "@/db/schema";
import { getLastUUIDSegment } from "@/utils/get-last-uuid-segment";

export const getBoardInfoById = async (boardId: string) => {
  try {
    const board = (await db.select().from(boardsTable).where(eq(boardsTable.id, boardId)))[0];

    return {
      ok: true,
      board,
    }
  } catch (error) {
    return {
      ok: false,
      message: `Board with id ${getLastUUIDSegment(boardId)} doesn't exist`,
    }
  }
};