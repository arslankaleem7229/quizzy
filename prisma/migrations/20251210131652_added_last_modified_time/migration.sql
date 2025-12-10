/*
  Warnings:

  - You are about to drop the column `completedAt` on the `UserQuizzAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `UserQuizzAttempt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,setId,isActive]` on the table `UserQuizzAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserQuizzAttempt_userId_setId_status_key";

-- AlterTable
ALTER TABLE "UserQuizzAttempt" DROP COLUMN "completedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "modified_at" TIMESTAMP(3),
ADD COLUMN     "started_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuizzAttempt_userId_setId_isActive_key" ON "UserQuizzAttempt"("userId", "setId", "isActive");
