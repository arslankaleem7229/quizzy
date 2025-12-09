import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import Error from "next/error";
import fs from "fs";
import crypto from "crypto";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/clients/s3";

interface Quizz {
  title: string;
  description: string;
  questions: Question[];
  createdById: string;
}

interface Question {
  // id: string;
  question: string;
  answer: string;
  explanation: string;
  hint: string;
  correctAnswer: string[];
  options: string[];
  attachments: Attachment[];
  nature: "ChooseOne" | "ChooseMany";
  quizzId: string;
}

interface Attachment {
  url: string;
  type: "option" | "answer" | "question";
  questionId: string;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyApiAuth(request);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();

    const userId = auth.token.id;

    if (!userId) {
      return NextResponse.json(
        { error: "userId are required" },
        { status: 400 }
      );
    }

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file found!" }, { status: 400 });
    }

    const text = Buffer.from(await file.arrayBuffer()).toString("utf8");

    let quizz: Quizz;

    try {
      const parsed = JSON.parse(text);
      quizz = parsed.quizz;
    } catch (err) {
      return NextResponse.json({ error: "Invalid JSON file" }, { status: 400 });
    }

    // Ensure quiz exists

    const quiz = await prisma.quizz.create({
      data: {
        title: quizz.title,
        description: quizz.description,
        createdById: userId,
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Insert questions
    const createdQuestions = [];
    let uploadedAttachments: Attachment[] = [];
    for (const q of quizz.questions) {
      const questionId = crypto.randomBytes(12).toString("hex");
      if (q.attachments.length > 0) {
        uploadedAttachments = [];
        for (const a of q.attachments) {
          const uploadedUrl = await uploadFileToS3({
            url: a.url,
            questionId: questionId,
          });
          if (!uploadedUrl) {
            return NextResponse.json(
              { error: "Something went wrong" },
              { status: 400 }
            );
          }

          uploadedAttachments.push({
            url: uploadedUrl,
            type: a.type,
            questionId: questionId,
          } as Attachment);
        }
      }

      const inserted = await prisma.question.create({
        data: {
          id: questionId,
          question: q.question,
          answer: q.answer,
          // attachments: {
          //   create: [...uploadedAttachments],
          // },

          explanation: q.explanation ?? "",
          hint: q.hint || "",
          correctAnswer: q.correctAnswer,
          options: q.options,
          nature: q.nature,
          // quizzId: quiz.id,
          quizz: {
            connect: { id: quiz.id },
          },
          ...(uploadedAttachments && uploadedAttachments.length > 0
            ? {
                attachments: {
                  create: uploadedAttachments.map((a) => ({
                    url: a.url,
                    type: a.type, // must match your enum
                  })),
                },
              }
            : {}),
        },
      });
      createdQuestions.push(inserted);
    }

    // Ensure user exists

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Seed inserted successfully",
      insertedCount: createdQuestions.length,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      {
        error: (err as Error) || "Failed to seed",
      },
      { status: 500 }
    );
  }
}

async function uploadFileToS3({
  url,
  questionId,
}: {
  url: string;
  questionId: string;
}): Promise<string | null> {
  if (!url) return null;
  try {
    const fileBytes = fs.readFileSync(url);
    // const fileExt = url.split(".").pop();
    const fileName = `${questionId}-${url.split("/").pop()}`;
    const fileExt = url.split(".").pop();

    const contentType =
      fileExt === "jpg" || fileExt === "jpeg"
        ? "image/jpeg"
        : fileExt === "png"
        ? "image/png"
        : fileExt === "gif"
        ? "image/gif"
        : "application/octet-stream";

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: fileBytes,
      ContentType: contentType,
    });

    const response = s3.send(command);

    response.then((data) => {
      console.log(data);
    });

    const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
}
