/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/seed/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { verifyApiAuth } from "@/lib/utils/verifyToken";
import { uploadFromURLToS3 } from "@/lib/utils/uploadToS3";

interface QuizSeedData {
  slug: string;
  isPublished?: boolean;
  localizations: LocalizationData[];
  createdById: string;
}

interface LocalizationData {
  language: string;
  title: string;
  description: string;
  questions: QuestionData[];
}

interface QuestionData {
  questionText: string;
  questionType:
    | "SINGLE_CHOICE"
    | "MULTIPLE_CHOICE"
    | "TRUE_FALSE"
    | "SHORT_ANSWER";
  explanation?: string;
  hint?: string;
  points?: number;
  orderIndex: number;
  difficultyLevel?: number;
  options: OptionData[];
  attachments?: AttachmentData[];
}

interface OptionData {
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
  attachments?: AttachmentData[];
}

interface AttachmentData {
  url: string;
  type:
    | "QUESTION_IMAGE"
    | "OPTION_IMAGE"
    | "QUESTION_AUDIO"
    | "QUESTION_GIF"
    | "OPTION_GIF";
  fileName?: string;
  mimeType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyApiAuth(request);
    if (!auth.authorized) return auth.response;

    const formData = await request.formData();
    const userId = auth.token.id;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file found!" }, { status: 400 });
    }

    const text = Buffer.from(await file.arrayBuffer()).toString("utf8");
    let quizData: QuizSeedData;

    try {
      const parsed = JSON.parse(text);
      quizData = parsed.quizz || parsed;
      quizData = transformLegacyFormat(quizData, userId);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid JSON file", details: (err as Error).message },
        { status: 400 }
      );
    }

    if (!quizData.slug || !quizData.localizations?.length) {
      return NextResponse.json(
        { error: "Invalid quiz data: slug and localizations are required" },
        { status: 400 }
      );
    }

    const existingQuiz = await prisma.quiz.findUnique({
      where: { slug: quizData.slug },
    });

    if (existingQuiz) {
      return NextResponse.json(
        { error: `Quiz with slug "${quizData.slug}" already exists` },
        { status: 409 }
      );
    }

    console.log(`Processing quiz: ${quizData.slug}`);

    const processedLocalizations = await processLocalizations(
      quizData.localizations
    );

    processedLocalizations.filter((a) =>
      a.questions.filter((q) =>
        q.options.filter((op) => {
          if ((op.attachments?.length ?? 0) > 0) console.log(op.attachments);
          return op.attachments;
        })
      )
    );

    const quiz = await prisma.quiz.create({
      data: {
        slug: quizData.slug,
        createdById: userId,
        isPublished: quizData.isPublished ?? false,
        totalQuestions: calculateTotalQuestions(quizData.localizations),
        localizations: {
          create: processedLocalizations.map((loc) => ({
            language: loc.language,
            title: loc.title,
            description: loc.description,
            questionCount: loc.questions.length,
            questions: {
              create: loc.questions.map((q) => ({
                questionText: q.questionText,
                questionType: q.questionType,
                explanation: q.explanation,
                hint: q.hint,
                points: q.points ?? 1,
                orderIndex: q.orderIndex,
                difficultyLevel: q.difficultyLevel ?? 1,
                hasAttachment: (q.attachments?.length ?? 0) > 0,
                options: {
                  create: q.options.map((opt) => ({
                    optionText: opt.optionText,
                    isCorrect: opt.isCorrect,
                    orderIndex: opt.orderIndex,
                    hasAttachment: (opt.attachments?.length ?? 0) > 0,
                    attachments: opt.attachments?.length
                      ? {
                          create: opt.attachments.map((att) => ({
                            url: att.url,
                            fileName: att.fileName,
                            mimeType: att.mimeType,
                            attachmentType: att.type,
                          })),
                        }
                      : undefined,
                  })),
                },
                attachments: q.attachments?.length
                  ? {
                      create: q.attachments.map((att) => ({
                        url: att.url,
                        fileName: att.fileName,
                        mimeType: att.mimeType,
                        attachmentType: att.type,
                      })),
                    }
                  : undefined,
              })),
            },
          })),
        },
      },
      include: {
        localizations: {
          include: {
            questions: {
              include: {
                options: true,
                attachments: true,
              },
            },
          },
        },
      },
    });

    const totalQuestions = quiz.localizations.reduce(
      (sum, loc) => sum + loc.questions.length,
      0
    );

    console.log(`✅ Successfully seeded quiz: ${quiz.slug}`);

    return NextResponse.json({
      success: true,
      message: "Quiz seeded successfully",
      data: {
        quizId: quiz.id,
        slug: quiz.slug,
        localizations: quiz.localizations.length,
        totalQuestions,
      },
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      {
        error: "Failed to seed quiz",
        details: (err as Error).message,
      },
      { status: 500 }
    );
  }
}

function transformLegacyFormat(data: any, userId: string): QuizSeedData {
  if (data.localizations) return data;
  const sets = data.sets || [];

  return {
    slug: data.slug,
    createdById: userId,
    isPublished: data.isPublished ?? false,
    localizations: sets.map((set: any) => ({
      language: set.language || "en",
      title: set.title,
      description: set.description,
      questions: (set.questions || []).map((q: any, qIndex: number) => ({
        questionText: q.question || q.questionText,
        questionType: mapQuestionType(q.nature || q.questionType),
        explanation: q.explanation || "",
        hint: q.hint || "",
        points: q.points ?? 1,
        orderIndex: qIndex,
        difficultyLevel: q.difficultyLevel ?? 1,
        options: (q.options || []).map((optText: string, optIndex: number) => ({
          optionText: optText,
          isCorrect: (q.correctAnswer || []).includes(optText),
          orderIndex: optIndex,
          attachments: filterAttachmentsByType(
            q.attachments,
            "option",
            optIndex
          ),
        })),
        attachments: filterAttachmentsByType(q.attachments, "question"),
      })),
    })),
  };
}

/**
 * Map old question types to new enum
 */
function mapQuestionType(oldType: string): QuestionData["questionType"] {
  switch (oldType) {
    case "ChooseOne":
      return "SINGLE_CHOICE";
    case "ChooseMany":
      return "MULTIPLE_CHOICE";
    default:
      return "SINGLE_CHOICE";
  }
}

function filterAttachmentsByType(
  attachments: any[] | undefined,
  type: string,
  index?: number
): AttachmentData[] {
  if (!attachments?.length) return [];

  return attachments
    .filter((att) => {
      if (att.type !== type) return false;
      if (index !== undefined && att.optionIndex !== index) return false;
      return true;
    })
    .map((att) => ({
      url: att.url,
      type: type === "question" ? "QUESTION_IMAGE" : "OPTION_IMAGE",
      fileName: att.fileName,
      mimeType: att.mimeType,
    }));
}

async function processLocalizations(
  localizations: LocalizationData[]
): Promise<LocalizationData[]> {
  const processed: LocalizationData[] = [];

  for (const loc of localizations) {
    const processedQuestions: QuestionData[] = [];

    for (const question of loc.questions) {
      const questionAttachments = await uploadAttachments(
        question.attachments || []
      );

      const processedOptions: OptionData[] = [];

      for (const option of question.options) {
        const optionAttachments = await uploadAttachments(
          option.attachments || []
        );
        processedOptions.push({
          ...option,
          attachments: optionAttachments,
        });
      }

      processedQuestions.push({
        ...question,
        attachments: questionAttachments,
        options: processedOptions,
      });
    }

    processed.push({
      ...loc,
      questions: processedQuestions,
    });
  }

  return processed;
}

/**
 * Upload attachments to S3
 */
async function uploadAttachments(
  attachments: AttachmentData[]
): Promise<AttachmentData[]> {
  const uploaded: AttachmentData[] = [];

  for (const att of attachments) {
    if (att.url.startsWith("https://") || att.url.startsWith("http://")) {
      uploaded.push(att);
      continue;
    }

    try {
      const s3Url = await uploadFromURLToS3({ url: att.url });

      if (!s3Url) {
        console.warn(`Failed to upload attachment: ${att.url}`);
        continue;
      }

      uploaded.push({
        ...att,
        url: s3Url,
      });
    } catch (error) {
      console.error(`Error uploading attachment ${att.url}:`, error);
    }
  }

  return uploaded;
}

function calculateTotalQuestions(localizations: LocalizationData[]): number {
  return localizations.reduce((sum, loc) => sum + loc.questions.length, 0);
}
