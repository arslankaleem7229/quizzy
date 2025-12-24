import { EmailFrequency, Theme, UserRole } from "@/app/generated/prisma";
import z from "zod";

export const settingsSchema = z
  .object({
    profilePicture: z.file().nullable().optional(),
    url: z.string().nullable().optional(),
    username: z.string().min(3).max(32).optional(),
    email: z.email().optional(),
    accountType: z.enum(UserRole).optional(),
    school: z
      .string()
      .max(255)
      .optional()
      .or(z.literal("").transform(() => null)),
    theme: z.enum(Theme).optional(),
    language: z.string().min(2).max(10).optional(),
    notifications: z
      .object({
        salesPromotions: z.boolean().optional(),
        streaksBadges: z.boolean().optional(),
        reminders: z.boolean().optional(),
        productUpdates: z.boolean().optional(),
        emailFrequency: z.enum(EmailFrequency).optional(),
      })
      .optional(),
    privacy: z
      .object({
        showRealName: z.boolean().optional(),
        showInSearch: z.boolean().optional(),
      })
      .optional(),
  })
  .strict();

export type SettingsPayload = z.infer<typeof settingsSchema>;
