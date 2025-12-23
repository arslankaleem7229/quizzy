import { SearchResponse, searchQuizInclude } from "@/lib/types/api";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const results = await prisma.quizLocalization.findMany({
      where: { quiz: { createdById: auth.token.id } },
      select: {
        title: true,
        description: true,
        language: true,
        ...searchQuizInclude,
      },
      orderBy: { updatedAt: "desc" },
    });

    if (!results) {
      return NextResponse.json<SearchResponse>(
        {
          success: false,
          error: { message: "Quiz not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json<SearchResponse>(
      { success: true, data: results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json<SearchResponse>(
      {
        success: false,
        error: { message: "Internal server error", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
