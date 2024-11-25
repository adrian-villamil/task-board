CREATE TYPE "public"."taskIcon" AS ENUM('man-working', 'dialog', 'coffee', 'weightlifter', 'books', 'clock');--> statement-breakpoint
CREATE TYPE "public"."taskStatus" AS ENUM('in-progress', 'completed', 'wont-do');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "boards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"taskIcon" "taskIcon" NOT NULL,
	"taskStatus" "taskStatus",
	"boardId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_boardId_boards_id_fk" FOREIGN KEY ("boardId") REFERENCES "public"."boards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
