import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { QuizResponse, quizWithLocalizationInclude } from "@/lib/types/api";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: id },
      // , localizations: { every: { language: "en" } }
      include: {
        ...quizWithLocalizationInclude,
        localizations: {
          ...quizWithLocalizationInclude.localizations,
          where: {
            language: "en",
          },
        },
      },
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

    return NextResponse.json<QuizResponse>(
      {
        success: true,
        data: quiz,
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
