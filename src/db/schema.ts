import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const boardsTable = pgTable('boards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  description: varchar('description'),
});

export const taskIcon = pgEnum('taskIcon', ['man-working', 'dialog', 'coffee', 'weightlifter', 'books', 'clock']);
export const taskStatus = pgEnum('taskStatus', ['in-progress', 'completed', 'wont-do']);

export const tasksTable = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  icon: taskIcon('taskIcon').notNull(),
  status: taskStatus('taskStatus'),
  boardId: uuid('boardId').references(() => boardsTable.id),
});