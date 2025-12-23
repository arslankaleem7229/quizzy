import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import {
  AttemptDetailResponse,
  attemptWithAnswersInclude,
  localizationWithQuestionsInclude,
} from "@/lib/types/api";
import { AttemptStatus } from "@/app/generated/prisma/client";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import {
  calculateAttemptStats,
  evaluateAnswerCorrectness,
} from "../../helpers";

const answerSchema = z.object({
  questionId: z.string().min(1),
  selectedOptionIds: z.array(z.string()).default([]),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const language = request.nextUrl.searchParams.get("language") || "en";

  const parsed = answerSchema.safeParse(await request.json());

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

  const { questionId, selectedOptionIds } = parsed.data;

  try {
    const attempt = await prisma.attempt.findUnique({
      where: { id: (await params).id },
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

    if (attempt.status === AttemptStatus.CANCELLED) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Attempt is cancelled", code: "FORBIDDEN" },
        },
        { status: 400 }
      );
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        options: true,
        localization: { select: { quizId: true, language: true } },
      },
    });

    if (
      !question ||
      question.localization.quizId !== attempt.quizId ||
      question.localization.language !== attempt.language
    ) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: {
            message: "Question not found for this attempt",
            code: "NOT_FOUND",
          },
        },
        { status: 404 }
      );
    }

    const uniqueSelections = Array.from(new Set(selectedOptionIds));
    const { isCorrect, pointsEarned } = evaluateAnswerCorrectness(
      question,
      uniqueSelections
    );

    await prisma.answer.upsert({
      where: {
        attemptId_questionId: {
          attemptId: attempt.id,
          questionId: question.id,
        },
      },
      create: {
        attemptId: attempt.id,
        questionId: question.id,
        selectedOptionIds: uniqueSelections,
        isCorrect,
        pointsEarned,
      },
      update: {
        selectedOptionIds: uniqueSelections,
        isCorrect,
        pointsEarned,
      },
    });

    const stats = await calculateAttemptStats(
      attempt.id,
      attempt.quizId,
      attempt.language
    );

    const shouldComplete =
      attempt.status === AttemptStatus.COMPLETED || stats.completed;

    const updatedAttempt = await prisma.attempt.update({
      where: { id: attempt.id },
      data: {
        status: shouldComplete
          ? AttemptStatus.COMPLETED
          : AttemptStatus.IN_PROGRESS,
        score: stats.score,
        maxScore: stats.maxScore,
        percentage: stats.percentage,
        timeSpent: shouldComplete
          ? Math.max(
              0,
              Math.floor(
                (Date.now() - new Date(attempt.startedAt).getTime()) / 1000
              )
            )
          : attempt.timeSpent ?? undefined,
        completedAt: shouldComplete ? new Date() : attempt.completedAt,
      },
      include: attemptWithAnswersInclude,
    });

    if (
      attempt.status !== AttemptStatus.COMPLETED &&
      updatedAttempt.status === AttemptStatus.COMPLETED
    ) {
      await prisma.quiz.update({
        where: { id: updatedAttempt.quizId },
        data: { totalAttempts: { increment: 1 } },
      });
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

    return NextResponse.json<AttemptDetailResponse>(
      { success: true, data: { attempt: updatedAttempt, localization } },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to record answer";
    const status = message.includes("not part of this question") ? 400 : 500;

    console.error("Failed to record answer", error);
    return NextResponse.json<AttemptDetailResponse>(
      {
        success: false,
        error: {
          message: status === 400 ? message : "Failed to record answer",
          code: status === 400 ? "INVALID_BODY" : "INTERNAL_ERROR",
        },
      },
      { status }
    );
  }
}
