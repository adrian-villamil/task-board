'use server';

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { boardsTable } from "@/db/schema";
import { getLastUUIDSegment } from "@/utils/get-last-uuid-segment";
import type { Board } from "@/interfaces/board.interface";

export const editBoardById = async (id: string, board: Board) => {
  try {
    await db.update(boardsTable).set(board).where(eq(boardsTable.id, id));

    revalidatePath('/board/[id]', 'page');

    return {
      ok: true,
      message: `Board with id ${getLastUUIDSegment(id)} was updated successfully.`,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Couldn't update board with id ${getLastUUIDSegment(id)}.`,
    };
  }
};