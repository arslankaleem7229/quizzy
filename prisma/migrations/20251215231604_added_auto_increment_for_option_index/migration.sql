/*
  Warnings:

  - A unique constraint covering the columns `[order_index]` on the table `question_options` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE question_options_order_index_seq;
ALTER TABLE "question_options" ALTER COLUMN "order_index" SET DEFAULT nextval('question_options_order_index_seq');
ALTER SEQUENCE question_options_order_index_seq OWNED BY "question_options"."order_index";

-- CreateIndex
CREATE UNIQUE INDEX "question_options_order_index_key" ON "question_options"("order_index");
