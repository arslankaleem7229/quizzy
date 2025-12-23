import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import {
  ReviewResponse,
  reviewWithUserInclude,
  ReviewsResponse,
} from "@/lib/types/api";
import { UserRole } from "@/app/generated/prisma/client";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import {
  getUserRole,
  recomputeQuizRating,
} from "@/lib/services/reviews/helpers";
import { updateSchema } from "@/types/api/review.schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const parsed = updateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json<ReviewResponse>(
      {
        success: false,
        error: {
          message: zodErrorsToString(parsed.error),
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json<ReviewResponse>(
        {
          success: false,
          error: { message: "Review not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const role = await getUserRole(auth.token.id);
    if (review.userId !== auth.token.id && role !== UserRole.ADMIN) {
      return NextResponse.json<ReviewResponse>(
        {
          success: false,
          error: { message: "Forbidden", code: "FORBIDDEN" },
        },
        { status: 403 }
      );
    }

    const updated = await prisma.review.update({
      where: { id: review.id },
      data: { rating: parsed.data.rating },
      include: reviewWithUserInclude,
    });

    await recomputeQuizRating(review.quizId);

    return NextResponse.json<ReviewResponse>(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update review", error);
    return NextResponse.json<ReviewResponse>(
      {
        success: false,
        error: { message: "Failed to update review", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: { message: "Review not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const role = await getUserRole(auth.token.id);
    if (review.userId !== auth.token.id && role !== UserRole.ADMIN) {
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: { message: "Forbidden", code: "FORBIDDEN" },
        },
        { status: 403 }
      );
    }

    await prisma.review.delete({ where: { id: review.id } });
    const summary = await recomputeQuizRating(review.quizId);

    const reviews = await prisma.review.findMany({
      where: { quizId: review.quizId },
      orderBy: { createdAt: "desc" },
      include: reviewWithUserInclude,
    });

    return NextResponse.json<ReviewsResponse>(
      {
        success: true,
        data: {
          reviews,
          averageRating: summary.averageRating,
          total: summary.total,
          userReview: null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete review", error);
    return NextResponse.json<ReviewsResponse>(
      {
        success: false,
        error: { message: "Failed to delete review", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
