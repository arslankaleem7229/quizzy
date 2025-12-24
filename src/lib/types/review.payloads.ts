import { Prisma } from "@/app/generated/prisma";
import { reviewWithUserInclude } from "./review.includes";

type ReviewWithUserPayload = Prisma.ReviewGetPayload<{
  include: typeof reviewWithUserInclude;
}>;
export type ReviewWithUser = ReviewWithUserPayload;
