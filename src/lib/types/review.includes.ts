import { Prisma } from "@/app/generated/prisma";
import { userBasics } from "./user.selects";

export const reviewWithUserInclude = {
  user: { select: userBasics },
} satisfies Prisma.ReviewInclude;
