import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import prisma from "@/prisma/client";
import {
  AttemptDetailResponse,
  attemptWithAnswersInclude,
  AttemptsResponse,
  localizationWithQuestionsInclude,
} from "@/lib/types/api";
import { AttemptStatus } from "@/app/generated/prisma/client";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import { calculateAttemptStats } from "./helpers";

const startAttemptSchema = z.object({
  quizId: z.string().min(1),
  language: z.string().min(1).optional(),
  isNew: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const quizId = searchParams.get("quizId") ?? undefined;

  if (
    statusParam &&
    !Object.values(AttemptStatus).includes(
      statusParam as "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
    )
  ) {
    return NextResponse.json<AttemptsResponse>(
      {
        success: false,
        error: { message: "Invalid status filter", code: "INVALID_QUERY" },
      },
      { status: 400 }
    );
  }

  try {
    const attempts = await prisma.attempt.findMany({
      where: {
        userId: auth.token.id,
        ...(quizId ? { quizId } : {}),
        ...(statusParam ? { status: statusParam as AttemptStatus } : {}),
      },
      orderBy: { updatedAt: "desc" },
      include: attemptWithAnswersInclude,
    });

    return NextResponse.json<AttemptsResponse>(
      { success: true, data: attempts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch attempts", error);
    return NextResponse.json<AttemptsResponse>(
      {
        success: false,
        error: { message: "Failed to fetch attempts", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const req = await request.json();
  console.log(req);
  const parsed = startAttemptSchema.safeParse(req);

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

  const data = parsed.data;
  const userId = auth.token.id;

  if (!userId) {
    return NextResponse.json<AttemptDetailResponse>(
      {
        success: false,
        error: { message: "User id missing from token", code: "UNAUTHORIZED" },
      },
      { status: 401 }
    );
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: data.quizId, isActive: true },
      select: { id: true, isPublished: true, createdById: true },
    });

    if (!quiz) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Quiz not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    if (!quiz.isPublished && quiz.createdById !== userId) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Quiz is not available", code: "FORBIDDEN" },
        },
        { status: 403 }
      );
    }

    const localization = await prisma.quizLocalization.findUnique({
      where: {
        quizId_language: {
          quizId: quiz.id,
          language: data.language ?? "en",
        },
      },
      include: localizationWithQuestionsInclude,
    });

    if (!localization) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: false,
          error: { message: "Quiz localization not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    // if (data.isNew) {
    //   await prisma.attempt.updateMany({
    //     where: {
    //       userId,
    //       quizId: quiz.id,
    //       language: data.language ?? "en",
    //       status: AttemptStatus.IN_PROGRESS,
    //     },
    //     data: { status: AttemptStatus.CANCELLED },
    //   });
    // }

    const existing = await prisma.attempt.findFirst({
      where: {
        userId,
        quizId: quiz.id,
        language: data.language,
        status: AttemptStatus.IN_PROGRESS,
      },
      include: attemptWithAnswersInclude,
      orderBy: { updatedAt: "desc" },
    });

    if (existing) {
      return NextResponse.json<AttemptDetailResponse>(
        {
          success: true,
          data: {
            attempt: existing,
            localization: localization,
          },
        },
        { status: 200 }
      );
    }

    const maxScore = localization.questions.reduce(
      (sum, question) => sum + (question.points ?? 0),
      0
    );

    const attempt = await prisma.attempt.create({
      data: {
        userId: userId,
        quizId: quiz.id,
        language: localization.language,
        status: AttemptStatus.IN_PROGRESS,
        maxScore,
      },
      include: attemptWithAnswersInclude,
    });

    const stats = await calculateAttemptStats(
      attempt.id,
      quiz.id,
      localization.language
    );

    const hydratedAttempt = await prisma.attempt.update({
      where: { id: attempt.id },
      data: {
        score: stats.score,
        maxScore: stats.maxScore,
        percentage: stats.percentage,
      },
      include: attemptWithAnswersInclude,
    });

    return NextResponse.json<AttemptDetailResponse>(
      { success: true, data: { attempt: hydratedAttempt, localization } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to start attempt", error);
    return NextResponse.json<AttemptDetailResponse>(
      {
        success: false,
        error: { message: "Failed to start attempt", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
