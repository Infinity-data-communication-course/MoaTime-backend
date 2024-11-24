/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `event_join` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "available_time" DROP CONSTRAINT "available_time_event_join_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_fkey";

-- DropForeignKey
ALTER TABLE "event_join" DROP CONSTRAINT "event_join_event_id_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "event_join" DROP COLUMN "deleted_at";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_join" ADD CONSTRAINT "event_join_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_time" ADD CONSTRAINT "available_time_event_join_id_fkey" FOREIGN KEY ("event_join_id") REFERENCES "event_join"("id") ON DELETE CASCADE ON UPDATE CASCADE;
