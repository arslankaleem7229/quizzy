import { Prisma } from "@/app/generated/prisma";

export const userBasics = {
  id: true,
  name: true,
  username: true,
  image: true,
  role: true,
} satisfies Prisma.UserSelect;

export const getUserWithPreference = {
  id: true,
  name: true,
  username: true,
  image: true,
  isActive: true,
  email: true,
  emailVerified: true,
  images: true,
  role: true,
  notificationSettings: true,
  userPreferences: true,
  accounts: true,
} satisfies Prisma.UserSelect;

export const getUserWithAccounts = {
  id: true,
  name: true,
  username: true,
  image: true,
  isActive: true,
  email: true,
  emailVerified: true,
  images: true,
  role: true,
  accounts: true,
  notificationSettings: true,
  userPreferences: true,
} satisfies Prisma.UserSelect;
