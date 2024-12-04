/*
  Warnings:

  - Added the required column `date` to the `available_time` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `start_time` on the `available_time` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `available_time` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "available_time" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "start_time",
ADD COLUMN     "start_time" INTEGER NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" INTEGER NOT NULL;
