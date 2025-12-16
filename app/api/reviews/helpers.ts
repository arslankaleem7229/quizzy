import { UserRole } from "@/app/generated/prisma";
import { reviewWithUserInclude, ReviewWithUser } from "@/lib/types/api";
import prisma from "@/prisma/client";

export async function buildReviewBundle(
  quizId: string,
  userId?: string
): Promise<{
  reviews: ReviewWithUser[];
  averageRating: number;
  total: number;
  userReview: ReviewWithUser | null;
}> {
  const [reviews, aggregate, userReview] = await Promise.all([
    prisma.review.findMany({
      where: { quizId },
      orderBy: { createdAt: "desc" },
      include: reviewWithUserInclude,
    }),
    prisma.review.aggregate({
      where: { quizId },
      _avg: { rating: true },
      _count: { rating: true },
    }),
    userId
      ? prisma.review.findUnique({
          where: { userId_quizId: { userId, quizId } },
          include: reviewWithUserInclude,
        })
      : null,
  ]);

  return {
    reviews,
    averageRating: Number((aggregate._avg.rating ?? 0).toFixed(2)),
    total: aggregate._count.rating,
    userReview: userReview ?? null,
  };
}

export async function recomputeQuizRating(quizId: string) {
  const aggregate = await prisma.review.aggregate({
    where: { quizId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const average = Number((aggregate._avg.rating ?? 0).toFixed(2));

  await prisma.quiz.update({
    where: { id: quizId },
    data: { avgRating: average },
  });

  return {
    averageRating: average,
    total: aggregate._count.rating,
  };
}

export async function getUserRole(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role ?? UserRole.STUDENT;
}
