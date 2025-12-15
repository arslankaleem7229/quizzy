-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('pending', 'error', 'done');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "status" "QuestionStatus" NOT NULL DEFAULT 'pending';
