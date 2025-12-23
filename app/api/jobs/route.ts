import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";

export async function GET(req: NextRequest) {
  const auth = await verifyApiAuth(req);
  if (!auth.authorized) return auth.response;

  const userId = auth.token.id;

  try {
    const jobs = await prisma.genAIJob.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        status: true,
        title: true,
        language: true,
        createdAt: true,
        completedAt: true,
        quizId: true,
        errorMessage: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to fetch jobs", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
