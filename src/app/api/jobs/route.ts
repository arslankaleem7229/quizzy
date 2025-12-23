import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";

export async function GET(req: NextRequest) {
  const auth = await verifyApiAuth(req);
  if (!auth.authorized) return auth.response;

  const userId = auth.token.id;

  try {
    const jobs = await prisma.genAIJob.findMany({
      where: { userId, status: "PENDING" },
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

    jobs.forEach((job) => {
      if (job.status === "PROCESSING") {
        global.io?.to(`user:${userId}`).emit("job-update", {
          jobId: job.id,
          status: "processing",
          message: "Generating your quiz...",
        });
      }

      if (job.status === "COMPLETED") {
        global.io?.to(`user:${userId}`).emit("job-update", {
          jobId: job.id,
          status: "completed",
          quizId: job.quizId,
        });
      }

      if (job.status === "FAILED") {
        global.io?.to(`user:${userId}`).emit("job-update", {
          jobId: job.id,
          status: "failed",
          error: job.errorMessage,
        });
      }

      if (job.status === "PENDING") {
        global.io?.to(`user:${userId}`).emit("job-update", {
          jobId: job.id,
          status: "queued",
          error: job.errorMessage,
        });
      }
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
