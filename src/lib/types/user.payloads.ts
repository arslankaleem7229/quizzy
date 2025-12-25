import { Prisma } from "@/app/generated/prisma";
import { getUserWithPreference, userBasics } from "@/lib/types/user.selects";

type UserBasicPayload = Prisma.UserGetPayload<{ select: typeof userBasics }>;

type UserWithPreferencePayload = Prisma.UserGetPayload<{
  select: typeof getUserWithPreference;
}>;

type UserPreferencesPayload = UserWithPreferencePayload["userPreferences"];
type NotificationPreferencesPayload =
  UserWithPreferencePayload["notificationSettings"];

export type UserBasic = UserBasicPayload;
export type UserWithPreference = UserWithPreferencePayload;
export type UserPreferences = UserPreferencesPayload;
export type NotificationPreferences = NotificationPreferencesPayload;
