import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

import { AttemptStatus } from "@/app/generated/prisma/client";
import { recentAttemptInclude, RecentListResponse } from "@/lib/types/api";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);

  const limitParam = Number(searchParams.get("limit"));

  const limit =
    Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(limitParam, 10)
      : 4;

  try {
    const attempts = await prisma.attempt.findMany({
      where: {
        userId: auth.token.id,
        status: { not: AttemptStatus.CANCELLED },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
      include: recentAttemptInclude,
    });

    return NextResponse.json<RecentListResponse>(
      { success: true, data: attempts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch recent attempts", error);
    return NextResponse.json<RecentListResponse>(
      {
        success: false,
        error: {
          message: "Failed to fetch recent attempts",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

// No use
// export async function POST(request: NextRequest) {
//   const auth = await verifyApiAuth(request);
//   if (!auth.authorized) return auth.response;

//   let body: unknown;
//   try {
//     body = await request.json();
//   } catch (error) {
//     return NextResponse.json<RecentItemResponse>(
//       {
//         success: false,
//         error: {
//           message: "Invalid or missing JSON body",
//           code: "INVALID_BODY",
//         },
//       },
//       { status: 400 }
//     );
//   }

//   const parsed = recentAttemptSchema.safeParse(body);

//   if (!parsed.success) {
//     return NextResponse.json<RecentItemResponse>(
//       {
//         success: false,
//         error: {
//           message: zodErrorsToString(parsed.error),
//           code: "INVALID_BODY",
//         },
//       },
//       { status: 400 }
//     );
//   }

//   const userId = auth.token.id;
//   const payload = parsed.data;
//   const targetStatus = payload.status ?? AttemptStatus.IN_PROGRESS;

//   if (!userId) {
//     return NextResponse.json<RecentItemResponse>(
//       {
//         success: false,
//         error: { message: "User id missing from token", code: "UNAUTHORIZED" },
//       },
//       { status: 401 }
//     );
//   }

//   try {
//     const quiz = await prisma.quiz.findUnique({
//       where: { id: payload.quizId, isActive: true },
//       select: { id: true, isPublished: true, createdById: true },
//     });

//     if (!quiz) {
//       return NextResponse.json<RecentItemResponse>(
//         {
//           success: false,
//           error: { message: "Quiz not found", code: "NOT_FOUND" },
//         },
//         { status: 404 }
//       );
//     }

//     if (!quiz.isPublished && quiz.createdById !== userId) {
//       return NextResponse.json<RecentItemResponse>(
//         {
//           success: false,
//           error: { message: "Quiz is not available", code: "FORBIDDEN" },
//         },
//         { status: 403 }
//       );
//     }
//     let localization;
//     try {
//       const quizId = payload.quizId;
//       localization = await prisma.quizLocalization.findFirst({
//         where: { quizId: quizId, language: payload.language ?? "en" },
//         include: localizationWithQuestionsInclude,
//       });
//     } catch (error) {
//       return NextResponse.json<RecentItemResponse>(
//         {
//           success: false,
//           error: {
//             message: "Quiz localization not found",
//             code: "NOT_FOUND",
//           },
//         },
//         { status: 404 }
//       );
//     }

//     if (!localization) {
//       return NextResponse.json<RecentItemResponse>(
//         {
//           success: false,
//           error: {
//             message: "Quiz localization not found",
//             code: "NOT_FOUND",
//           },
//         },
//         { status: 404 }
//       );
//     }

//     const existing = await prisma.attempt.findFirst({
//       where: {
//         userId,
//         quizId: quiz.id,
//         language: localization.language,
//       },
//       orderBy: { updatedAt: "desc" },
//       include: recentAttemptInclude,
//     });

//     const shouldComplete = targetStatus === AttemptStatus.COMPLETED;

//     if (existing) {
//       const lockedStatus =
//         existing.status === AttemptStatus.COMPLETED
//           ? AttemptStatus.COMPLETED
//           : targetStatus;

//       const updated = await prisma.attempt.update({
//         where: { id: existing.id },
//         data: {
//           status: lockedStatus,
//           language: localization.language,
//           completedAt:
//             lockedStatus === AttemptStatus.COMPLETED
//               ? existing.completedAt ?? new Date()
//               : null,
//         },
//         include: recentAttemptInclude,
//       });

//       return NextResponse.json<RecentItemResponse>(
//         { success: true, data: updated },
//         { status: 200 }
//       );
//     }

//     const maxScore = localization.questions.reduce(
//       (sum, question) => sum + (question.points ?? 0),
//       0
//     );

//     const created = await prisma.attempt.create({
//       data: {
//         userId,
//         quizId: quiz.id,
//         language: localization.language,
//         status: targetStatus,
//         maxScore,
//         completedAt: shouldComplete ? new Date() : null,
//       },
//       include: recentAttemptInclude,
//     });

//     return NextResponse.json<RecentItemResponse>(
//       { success: true, data: created },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Failed to update recent attempts", error);
//     return NextResponse.json<RecentItemResponse>(
//       {
//         success: false,
//         error: {
//           message: "Failed to update recent attempts",
//           code: "INTERNAL_ERROR",
//         },
//       },
//       { status: 500 }
//     );
//   }
// }
