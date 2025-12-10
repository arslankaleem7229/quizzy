/*
  Warnings:

  - A unique constraint covering the columns `[attemptId,questionId]` on the table `UserAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_attemptId_questionId_key" ON "UserAnswer"("attemptId", "questionId");
