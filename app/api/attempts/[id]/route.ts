import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import {
  AttemptDetailResponse,
  attemptWithAnswersInclude,
  getAttemptPayload,
  GetAttemptResponse,
  localizationWithQuestionsInclude,
} from "@/lib/types/api";
import { AttemptStatus } from "@/app/generated/prisma/client";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import { calculateAttemptStats } from "../helpers";

const updateAttemptSchema = z.object({
  status: z.enum(AttemptStatus).optional(),
  timeSpent: z.number().int().nonnegative().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const attemptId = (await params).id;

  if (!attemptId) {
    return NextResponse.json<GetAttemptResponse>(
      {
        success: false,
        error: { message: "Attempt not found", code: "NOT_FOUND" },
      },
      { status: 404 }
    );
  }

  try {
    const attempts = await prisma.attempt.findUnique({
      where: {
        id: attemptId,
        userId: auth.token.id,
      },
      select: getAttemptPayload,
    });

    if (!attempts) {
      return NextResponse.json<GetAttemptResponse>(
        {
          success: false,
          error: { message: "No attempt found", code: "NOT_FOUND" },
        },
        { status: 200 }
      );
    }

    return NextResponse.json<GetAttemptResponse>(
      { success: true, data: attempts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch attempts", error);
    return NextResponse.json<GetAttemptResponse>(
      {
        success: false,
        error: { message: "Failed to fetch attempts", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const language = request.nextUrl.searchParams.get("language") || "en";

  const parsed = updateAttemptSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json<AttemptDetailResponse>(
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
    const attempt = await prisma.attempt.findFirst({
      where: {
        quizId: (await params).id,
        language: language,
        userId: auth.token.id,
        status: AttemptStatus.IN_PROGRESS,
      },
      include: attemptWithAnswersInclude,
    });

    if (!attempt || attempt.userId !== auth.token.id) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Attempt not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const localization = await prisma.quizLocalization.findUnique({
      where: {
        quizId_language: {
          quizId: attempt.quizId,
          language: language,
        },
      },
      include: localizationWithQuestionsInclude,
    });

    if (!localization) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Localization not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const stats = await calculateAttemptStats(
      attempt.id,
      attempt.quizId,
      language
    );

    const nextStatus =
      parsed.data.status ??
      (stats.completed ? AttemptStatus.COMPLETED : attempt.status);

    const lockedStatus =
      attempt.status === AttemptStatus.COMPLETED &&
      nextStatus !== AttemptStatus.COMPLETED
        ? AttemptStatus.COMPLETED
        : nextStatus;

    const shouldComplete =
      lockedStatus === AttemptStatus.COMPLETED ||
      (attempt.status !== AttemptStatus.COMPLETED && stats.completed);

    const timeSpent =
      parsed.data.timeSpent ??
      (shouldComplete
        ? Math.max(
            0,
            Math.floor(
              (Date.now() - new Date(attempt.startedAt).getTime()) / 1000
            )
          )
        : attempt.timeSpent ?? undefined);

    const updated = await prisma.attempt.update({
      where: { id: attempt.id },
      data: {
        status: shouldComplete ? AttemptStatus.COMPLETED : lockedStatus,
        score: stats.score,
        maxScore: stats.maxScore,
        percentage: stats.percentage,
        timeSpent,
        completedAt: shouldComplete ? new Date() : attempt.completedAt,
      },
      include: attemptWithAnswersInclude,
    });

    if (
      attempt.status !== AttemptStatus.COMPLETED &&
      updated.status === AttemptStatus.COMPLETED
    ) {
      await prisma.quiz.update({
        where: { id: updated.quizId },
        data: { totalAttempts: { increment: 1 } },
      });
    }

    return NextResponse.json<AttemptDetailResponse>(
      {
        success: true,
        data: { attempt: updated, localization: localization },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update attempt", error);
    return NextResponse.json<AttemptDetailResponse>(
      {
        success: false,
        error: { message: "Failed to update attempt", code: "INTERNAL_ERROR" },
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

  const language = request.nextUrl.searchParams.get("language") || "en";

  try {
    const attempt = await prisma.attempt.findUnique({
      where: { id: params.id },
    });

    if (!attempt || attempt.userId !== auth.token.id) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Attempt not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const updated = await prisma.attempt.update({
      where: { id: attempt.id },
      data: { status: AttemptStatus.CANCELLED },
      include: attemptWithAnswersInclude,
    });

    const localization = await prisma.quizLocalization.findUnique({
      where: {
        quizId_language: {
          quizId: attempt.quizId,
          language: language,
        },
      },
      include: localizationWithQuestionsInclude,
    });

    return NextResponse.json<AttemptDetailResponse>(
      localization
        ? {
            success: true,
            data: {
              attempt: updated,
              localization,
            },
          }
        : {
            success: false,
            error: { message: "Localization not found", code: "NOT_FOUND" },
          },
      { status: localization ? 200 : 404 }
    );
  } catch (error) {
    console.error("Failed to cancel attempt", error);
    return NextResponse.json<AttemptDetailResponse>(
      {
        success: false,
        error: { message: "Failed to cancel attempt", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
