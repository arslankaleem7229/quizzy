import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

import {
  QuizResponse,
  quizWithoutLocalizationInclude,
  QuizzesResponse,
  quizWithLocalizationInclude,
} from "@/lib/types/api";
import zodErrorsToString from "@/lib/utils/zodErrorstoString";
import { createFlashcardSchema } from "@/types/api/quiz.schemas";
import { QuestionType } from "@/app/generated/prisma";
import { normalizeOptions } from "@/lib/services/quiz/options.helper";
import {
  BadRequestError,
  prepareQuestionsWithUploads,
} from "@/lib/services/quiz/question.helper";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);

  const cursor = searchParams.get("cursor");
  const mode = searchParams.get("mode") || "mini";
  const limit = Number(
    searchParams.get("limit") ?? (mode === "mini" ? "5" : "20")
  );

  try {
    const quiz = await prisma.quiz.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: quizWithoutLocalizationInclude,
    });

    if (!quiz) {
      return NextResponse.json<QuizResponse>(
        {
          success: false,
          error: { message: "Quiz not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    const nextCursor = quiz.length === limit ? quiz[quiz.length - 1].id : null;

    return NextResponse.json<QuizzesResponse>(
      {
        success: true,
        data: quiz,
        pagination: {
          limit: limit,
          cursor: cursor ?? null,
          nextCursor: nextCursor,
          hasMore: nextCursor != null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: { message: "Internal server error", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const contentType = request.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  let formData: FormData | null = null;
  let rawBody: unknown;

  try {
    if (isMultipart) {
      formData = await request.formData();
      const payload =
        (formData.get("payload") as string | null) ||
        (formData.get("data") as string | null) ||
        (formData.get("body") as string | null);

      if (!payload) {
        return NextResponse.json<QuizResponse>(
          {
            success: false,
            error: {
              message: "Missing payload field in form-data (payload/data/body)",
              code: "INVALID_BODY",
            },
          },
          { status: 400 }
        );
      }

      rawBody = JSON.parse(payload);
    } else {
      rawBody = await request.json();
    }
  } catch (error) {
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message: `Invalid or missing JSON body: ${error}`,
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  const parsed = createFlashcardSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json<QuizResponse>(
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
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: { message: "User id missing from token", code: "UNAUTHORIZED" },
      },
      { status: 401 }
    );
  }

  try {
    const questionsWithUploads = await prepareQuestionsWithUploads(
      data.questions,
      formData
    );

    const optionsByQuestion = questionsWithUploads.map((question) =>
      normalizeOptions(question, question.attachments?.answer)
    );

    const quiz = await prisma.quiz.create({
      data: {
        slug: data.slug ?? data.title,
        createdById: userId,
        isPublished: data.isPublished ?? false,
        totalQuestions: questionsWithUploads.length,
        localizations: {
          create: [
            {
              language: data.language ?? "en",
              title: data.title,
              description: data.description ?? "",
              questionCount: questionsWithUploads.length,
              questions: {
                create: questionsWithUploads.map((question, index) => {
                  const options = optionsByQuestion[index];
                  const hasOptionAttachments = options.some(
                    (opt) => opt.attachments.length > 0
                  );

                  return {
                    questionText: question.term,
                    questionType:
                      question.questionType ?? QuestionType.SINGLE_CHOICE,
                    explanation: question.explanation ?? "",
                    hint: question.hint ?? "",
                    points: 1,
                    orderIndex: index,
                    difficultyLevel: 1,
                    hasAttachment:
                      hasOptionAttachments ||
                      (question.attachments?.question?.length ?? 0) > 0,
                    options: {
                      create: options.map((opt, optIndex) => ({
                        optionText: opt.optionText,
                        isCorrect: opt.isCorrect,
                        orderIndex: opt.orderIndex ?? optIndex,
                        hasAttachment: opt.attachments.length > 0,
                        attachments:
                          opt.attachments.length > 0
                            ? {
                                create: opt.attachments.map((att) => ({
                                  url: att.url!,
                                  fileName: att.fileName,
                                  mimeType: att.mimeType,
                                  attachmentType: att.attachmentType,
                                })),
                              }
                            : undefined,
                      })),
                    },
                    attachments: question.attachments?.question?.length
                      ? {
                          create: question.attachments.question.map((att) => ({
                            url: att.url,
                            fileName: att.fileName,
                            mimeType: att.mimeType,
                            attachmentType: att.attachmentType,
                          })),
                        }
                      : undefined,
                  };
                }),
              },
            },
          ],
        },
      },
      include: quizWithLocalizationInclude,
    });

    return NextResponse.json<QuizResponse>(
      { success: true, data: quiz },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create flashcard set";
    const isBadRequest =
      error instanceof BadRequestError || message.includes("correct option");
    const status = isBadRequest ? 400 : 500;

    console.error("Error creating flashcard set:", error);
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message: status === 400 ? message : "Failed to create flashcard set",
          code: status === 400 ? "INVALID_BODY" : "INTERNAL_ERROR",
        },
      },
      { status }
    );
  }
}
