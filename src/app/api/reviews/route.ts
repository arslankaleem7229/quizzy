import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { ReviewsResponse, reviewWithUserInclude } from "@/lib/types/api";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import {
  buildReviewBundle,
  recomputeQuizRating,
} from "@/lib/services/reviews/helpers";
import { reviewSchema } from "@/types/api/review.schema";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");

  if (!quizId) {
    return NextResponse.json<ReviewsResponse>(
      {
        success: false,
        error: { message: "quizId is required", code: "INVALID_QUERY" },
      },
      { status: 400 }
    );
  }

  try {
    const data = await buildReviewBundle(quizId, auth.token.id);

    return NextResponse.json<ReviewsResponse>(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to load reviews", error);
    return NextResponse.json<ReviewsResponse>(
      {
        success: false,
        error: { message: "Failed to load reviews", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const parsed = reviewSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json<ReviewsResponse>(
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

  const data = parsed.data;
  const userId = auth.token.id;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: data.quizId, isActive: true },
      select: { id: true, isPublished: true, createdById: true },
    });

    if (!quiz) {
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: { message: "Quiz not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    if (!quiz.isPublished && quiz.createdById !== userId) {
      return NextResponse.json<ReviewsResponse>(
        {
          success: false,
          error: { message: "Quiz is not available", code: "FORBIDDEN" },
        },
        { status: 403 }
      );
    }

    const review = await prisma.review.upsert({
      where: { userId_quizId: { userId, quizId: data.quizId } },
      update: { rating: data.rating },
      create: {
        rating: data.rating,
        quizId: data.quizId,
        userId,
      },
      include: reviewWithUserInclude,
    });

    const summary = await recomputeQuizRating(data.quizId);

    const reviews = await prisma.review.findMany({
      where: { quizId: data.quizId },
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
          userReview: review,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save review", error);
    return NextResponse.json<ReviewsResponse>(
      {
        success: false,
        error: { message: "Failed to save review", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
