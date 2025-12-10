/*
  Warnings:

  - You are about to drop the column `modified_at` on the `UserQuizzAttempt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserQuizzAttempt" DROP COLUMN "modified_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);
