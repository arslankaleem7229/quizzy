import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const quizz = await prisma.quizz.findMany({
    include: { questions: true },
  });

  if (!quizz)
    return NextResponse.json({ error: "No Quizzes found" }, { status: 404 });
  return NextResponse.json(quizz, { status: 201 });
}
