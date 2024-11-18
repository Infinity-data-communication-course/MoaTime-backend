/*
  Warnings:

  - The values [APPROVED] on the enum `JoinState` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `earliest_time` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `latest_time` on the `event` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JoinState_new" AS ENUM ('PENDING', 'JOINED', 'REFUSED');
ALTER TABLE "event_join" ALTER COLUMN "joinState" TYPE "JoinState_new" USING ("joinState"::text::"JoinState_new");
ALTER TYPE "JoinState" RENAME TO "JoinState_old";
ALTER TYPE "JoinState_new" RENAME TO "JoinState";
DROP TYPE "JoinState_old";
COMMIT;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "earliest_time",
DROP COLUMN "latest_time",
ADD COLUMN     "end_time" INTEGER NOT NULL,
ADD COLUMN     "start_time" INTEGER NOT NULL;
