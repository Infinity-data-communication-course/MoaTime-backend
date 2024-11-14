/*
  Warnings:

  - You are about to drop the `AvailableTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvailableTime" DROP CONSTRAINT "AvailableTime_event_join_id_fkey";

-- DropTable
DROP TABLE "AvailableTime";

-- CreateTable
CREATE TABLE "available_time" (
    "id" SERIAL NOT NULL,
    "event_join_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_time_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "available_time" ADD CONSTRAINT "available_time_event_join_id_fkey" FOREIGN KEY ("event_join_id") REFERENCES "event_join"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
