import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const quizz = await prisma.quizz.findMany({
    include: { questions: true },
  });

  if (!quizz)
    return NextResponse.json({ error: "No Quizzes found" }, { status: 404 });
  return NextResponse.json(quizz, { status: 201 });
}
