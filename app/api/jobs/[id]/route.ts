import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";

export async function GET(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const auth = await verifyApiAuth(req);
  if (!auth.authorized) return auth.response;

  const jobId = params.jobId;
  const userId = auth.token.id;

  try {
    const job = await prisma.genAIJob.findFirst({
      where: {
        id: jobId,
        userId,
      },
      include: {
        quiz: {
          include: {
            localizations: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Job not found", code: "NOT_FOUND" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to fetch job", code: "INTERNAL_ERROR" },
      },
      { status: 500 }
    );
  }
}
