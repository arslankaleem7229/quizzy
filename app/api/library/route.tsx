import {
  QuizzesResponse,
  quizWithoutLocalizationInclude,
} from "@/lib/types/api";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const quiz = await prisma.quiz.findMany({
      where: { createdById: auth.token.id },
      include: quizWithoutLocalizationInclude,
    });

    if (!quiz) {
      return NextResponse.json<QuizzesResponse>(
        {
          success: false,
          error: { message: "Quiz not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json<QuizzesResponse>(
      {
        success: true,
        data: quiz,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json<QuizzesResponse>(
      {
        success: false,
        error: { message: "Internal server error", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
