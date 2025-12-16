-- CreateEnum
CREATE TYPE "EmailFrequency" AS ENUM ('INSTANT', 'DAILY', 'WEEKLY', 'NEVER');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DARK', 'LIGHT', 'AUTO');

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT 'AUTO',
    "language" VARCHAR(10) NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "study_reminders" BOOLEAN NOT NULL DEFAULT true,
    "streaks_and_badges" BOOLEAN NOT NULL DEFAULT true,
    "features_and_tips" BOOLEAN NOT NULL DEFAULT true,
    "sales_and_promotions" BOOLEAN NOT NULL DEFAULT false,
    "email_frequency" "EmailFrequency" NOT NULL DEFAULT 'DAILY',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "user_preferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_settings_user_id_key" ON "notification_settings"("user_id");

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
