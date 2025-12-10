/*
  Warnings:

  - You are about to drop the column `description` on the `Quizz` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Quizz` table. All the data in the column will be lost.
  - You are about to drop the column `quizzId` on the `UserQuizzAttempt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Quizz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `setId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setId` to the `UserQuizzAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizzId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuizzAttempt" DROP CONSTRAINT "UserQuizzAttempt_quizzId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "setId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quizz" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserQuizzAttempt" DROP COLUMN "quizzId",
ADD COLUMN     "setId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuizzSet" (
    "id" TEXT NOT NULL,
    "quizzId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "QuizzSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizzSet_id_key" ON "QuizzSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quizz_slug_key" ON "Quizz"("slug");

-- AddForeignKey
ALTER TABLE "QuizzSet" ADD CONSTRAINT "QuizzSet_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_setId_fkey" FOREIGN KEY ("setId") REFERENCES "QuizzSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizzAttempt" ADD CONSTRAINT "UserQuizzAttempt_setId_fkey" FOREIGN KEY ("setId") REFERENCES "QuizzSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
