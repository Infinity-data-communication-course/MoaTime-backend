/*
  Warnings:

  - You are about to drop the column `category_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `max_people` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `earliest_time` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest_time` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinState` to the `event_join` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JoinState" AS ENUM ('PENDING', 'APPROVED', 'REFUSED');

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_region_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_city_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_event_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_city_id_fkey";

-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "category_id",
DROP COLUMN "city_id",
DROP COLUMN "description",
DROP COLUMN "end_time",
DROP COLUMN "max_people",
DROP COLUMN "start_time",
ADD COLUMN     "dates" TIMESTAMP(3)[],
ADD COLUMN     "earliest_time" INTEGER NOT NULL,
ADD COLUMN     "latest_time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "event_join" ADD COLUMN     "joinState" "JoinState" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "birthday",
DROP COLUMN "city_id",
DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "city";

-- DropTable
DROP TABLE "region";

-- DropTable
DROP TABLE "review";

-- CreateTable
CREATE TABLE "AvailableTime" (
    "id" SERIAL NOT NULL,
    "event_join_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailableTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "AvailableTime" ADD CONSTRAINT "AvailableTime_event_join_id_fkey" FOREIGN KEY ("event_join_id") REFERENCES "event_join"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
