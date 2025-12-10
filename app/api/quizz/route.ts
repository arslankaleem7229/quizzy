import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import Error from "next/error";
import { ReturnQuizzesOnly } from "@/lib/types/prisma";

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
    const quizzes = await prisma.quizz.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,

      include: {
        sets: {
          select: {
            title: true,
            description: true,
            language: true,
            _count: { select: { userQuizzAttempts: true, questions: true } },
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            type: true,
          },
        },
      },
    });

    if (!quizzes)
      return NextResponse.json({ error: "No Quizzes found" }, { status: 404 });

    const nextCursor =
      quizzes.length === limit ? quizzes[quizzes.length - 1].id : null;

    return NextResponse.json(
      {
        quizzes,
        pagination: {
          limit: limit,
          cursor: cursor ?? null,
          nextCursor: nextCursor,
          hasMore: nextCursor != null,
        },
      } satisfies ReturnQuizzesOnly,
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.log(error);
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
