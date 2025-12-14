import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { QuizDetail } from "@/lib/types/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const quizz = await prisma.quizz.findUnique({
    where: { id: id },
    include: {
      _count: { select: { reviews: true } },
      sets: {
        where: { language: "en" },
        include: {
          questions: true,
          userQuizzAttempts: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          username: true,
          type: true,
        },
      },
    },
  });

  if (!quizz)
    return NextResponse.json({ error: "Quizz not found" }, { status: 404 });
  return NextResponse.json(quizz satisfies QuizDetail, {
    status: 200,
  });
}
