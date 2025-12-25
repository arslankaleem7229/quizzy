import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { searchQuizInclude } from "@/lib/types/quiz.includes";
import { SearchResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();
  const language = searchParams.get("language") || undefined;
  const limitParam = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(limitParam, 24)
      : 3;

  if (!query) {
    return NextResponse.json<SearchResponse>(
      {
        success: false,
        error: { message: "Search needs to have query", code: "NOT_FOUND" },
      },
      { status: 401 }
    );
  }

  try {
    const results = await prisma.quizLocalization.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { quiz: { slug: { contains: query, mode: "insensitive" } } },
        ],
        quiz: { isActive: true, isPublished: true },
      },
      take: limit,
      select: {
        title: true,
        description: true,
        language: true,
        ...searchQuizInclude,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json<SearchResponse>(
      { success: true, data: results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Search failed", error);
    return NextResponse.json<SearchResponse>(
      {
        success: false,
        error: {
          message: "Failed to search content",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
