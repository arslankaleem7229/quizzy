import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import Error from "next/error";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { uploadFromURLToS3 } from "@/lib/utils/uploadToS3";

interface Quizz {
  slug: string;
  sets: QuizzSet[];
  createdById: string;
}

interface QuizzSet {
  id: string;
  language: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  setId: string;
  question: string;
  answer: string;
  explanation: string;
  hint: string;
  correctAnswer: string[];
  options: string[];
  attachments: Attachment[];
  nature: "ChooseOne" | "ChooseMany";
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
      return NextResponse.json(
        { error: `Invalid JSON file ${err}` },
        { status: 400 }
      );
    }

    // Ensure quiz exists

    let uploadedAttachments: Attachment[] = [];

    for (const set of quizz.sets) {
      for (const q of set.questions) {
        if (q.attachments?.length > 0) {
          const uploaded: Attachment[] = [];
          for (const a of q.attachments) {
            const url = await uploadFromURLToS3({ url: a.url });
            if (url) uploaded.push({ url: url!, type: a.type, questionId: "" });
            else {
              return NextResponse.json({
                error: `Error while uploading file.${url}`,
              });
            }
          }
          uploadedAttachments = uploaded;
        } else {
          uploadedAttachments = [];
        }
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        slug: quizz.slug,
        createdById: userId,
        sets: {
          create: quizz.sets.map((set) => ({
            language: set.language,
            title: set.title,
            description: set.description,
            questions: {
              create: set.questions.map((q) => ({
                question: q.question,
                answer: q.answer ?? "",
                explanation: q.explanation ?? "",
                hint: q.hint || "",
                correctAnswer: q.correctAnswer,
                options: q.options,
                nature: q.nature,
                attachments: {
                  create: uploadedAttachments.map((a) => ({
                    url: a.url,
                    type: a.type,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        sets: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
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
      insertedCount: quiz.sets.length * quiz.sets[0].questions.length,
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
