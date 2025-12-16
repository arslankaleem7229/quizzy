import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import Error from "next/error";
import {
  QuizResponse,
  quizWithoutLocalizationInclude,
  QuizzesResponse,
} from "@/lib/types/api";

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
