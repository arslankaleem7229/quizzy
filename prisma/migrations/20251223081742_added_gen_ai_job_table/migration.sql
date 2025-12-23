-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "gen_ai_job" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "input_text" TEXT,
    "file_url" TEXT,
    "prompt_type" TEXT,
    "flashcards" JSONB,
    "error_message" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "gen_ai_job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gen_ai_job_user_id_created_at_idx" ON "gen_ai_job"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "gen_ai_job_status_created_at_idx" ON "gen_ai_job"("status", "created_at");

-- AddForeignKey
ALTER TABLE "gen_ai_job" ADD CONSTRAINT "gen_ai_job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
