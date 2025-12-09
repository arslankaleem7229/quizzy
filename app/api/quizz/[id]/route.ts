import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const quizz = await prisma.quizz.findUnique({
    where: { id: params.id },
    include: { questions: true },
  });

  if (!quizz)
    return NextResponse.json({ error: "Quizz not found" }, { status: 404 });
  return NextResponse.json(quizz, { status: 201 });
}
