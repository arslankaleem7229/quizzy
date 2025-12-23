/*
  Warnings:

  - You are about to drop the column `file_url` on the `gen_ai_job` table. All the data in the column will be lost.
  - You are about to drop the column `flashcards` on the `gen_ai_job` table. All the data in the column will be lost.
  - You are about to drop the column `prompt_type` on the `gen_ai_job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quiz_id]` on the table `gen_ai_job` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "gen_ai_job" DROP COLUMN "file_url",
DROP COLUMN "flashcards",
DROP COLUMN "prompt_type",
ADD COLUMN     "ai_response" JSONB,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "file_name" TEXT,
ADD COLUMN     "language" TEXT DEFAULT 'en',
ADD COLUMN     "quiz_id" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "gen_ai_job_quiz_id_key" ON "gen_ai_job"("quiz_id");

-- AddForeignKey
ALTER TABLE "gen_ai_job" ADD CONSTRAINT "gen_ai_job_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
