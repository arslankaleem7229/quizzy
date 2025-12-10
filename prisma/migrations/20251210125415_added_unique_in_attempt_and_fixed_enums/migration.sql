/*
  Warnings:

  - The values [attempted] on the enum `AttemptStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId,setId,status]` on the table `UserQuizzAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttemptStatus_new" AS ENUM ('seen', 'incomplete', 'completed');
ALTER TABLE "UserQuizzAttempt" ALTER COLUMN "status" TYPE "AttemptStatus_new" USING ("status"::text::"AttemptStatus_new");
ALTER TYPE "AttemptStatus" RENAME TO "AttemptStatus_old";
ALTER TYPE "AttemptStatus_new" RENAME TO "AttemptStatus";
DROP TYPE "public"."AttemptStatus_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "UserQuizzAttempt_userId_setId_status_key" ON "UserQuizzAttempt"("userId", "setId", "status");
