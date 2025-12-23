import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { QuizResponse } from "@/lib/types/api";
import { readFileContent } from "@/lib/ai/openai";
import { getQuizzGenQueue } from "@/lib/worker/queue";

type AiQuizPayload = {
  title?: string;
  description?: string;
  language?: string;
  text?: string;
  file?: File;
};

async function readMultipartPayload(
  request: NextRequest
): Promise<AiQuizPayload> {
  const formData = await request.formData();

  const file = formData.get("file");
  const textPart = formData.get("text");

  let text = typeof textPart === "string" ? textPart : "";

  if (file instanceof File) {
    text = await readFileContent(file);
  }

  return {
    title:
      typeof formData.get("title") === "string"
        ? (formData.get("title") as string)
        : undefined,
    description:
      typeof formData.get("description") === "string"
        ? (formData.get("description") as string)
        : undefined,
    language:
      typeof formData.get("language") === "string"
        ? (formData.get("language") as string)
        : "en",
    text,
    file: file instanceof File ? file : undefined,
  };
}

async function readJsonPayload(request: NextRequest): Promise<AiQuizPayload> {
  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    throw new Error("Invalid or missing JSON body");
  }

  const payload = body as Partial<AiQuizPayload>;
  return {
    title: payload.title,
    description: payload.description,
    language: payload.language ?? "en",
    text: payload.text,
  };
}

export async function POST(request: NextRequest) {
  const auth = await verifyApiAuth(request);
  if (!auth.authorized) return auth.response;

  const userId = auth.token.id;
  if (!userId) {
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message: "User id missing from token",
          code: "UNAUTHORIZED",
        },
      },
      { status: 401 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  let payload: AiQuizPayload;
  try {
    payload = isMultipart
      ? await readMultipartPayload(request)
      : await readJsonPayload(request);
  } catch (error) {
    console.log(error);

    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Invalid request payload",
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  const material = payload.text ?? "";
  if (!material.trim()) {
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message: "Provide either a text body or a file in form-data",
          code: "INVALID_BODY",
        },
      },
      { status: 400 }
    );
  }

  try {
    const job = await prisma.genAIJob.create({
      data: {
        userId,
        title: payload.title,
        description: payload.description,
        language: payload.language || "en",
        inputText: material,
        fileName: payload.file?.name,
        status: "PENDING",
      },
    });

    console.log(`[API] Created job ${job.id} for user ${userId}`);

    const queue = getQuizzGenQueue();
    await queue.add("quizz-generation", {
      jobId: job.id,
      userId,
      title: payload.title,
      description: payload.description,
      language: payload.language || "en",
      inputText: material,
      fileName: payload.file?.name,
    });

    console.log(`[API] Job ${job.id} added to queue`);

    global.io?.to(`user:${userId}`).emit("job-update", {
      jobId: job.id,
      status: "queued",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          jobId: job.id,
          status: "pending",
          message: "Quiz generation started",
          estimatedTime: "30-60 seconds",
        },
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("[API] Error creating job:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create job";
    return NextResponse.json<QuizResponse>(
      {
        success: false,
        error: {
          message,
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
