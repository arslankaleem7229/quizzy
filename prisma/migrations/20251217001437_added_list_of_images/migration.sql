-- AlterTable
ALTER TABLE "users" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
