import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import fs from "fs";
import path from "path";
import Error from "next/error";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        {
          error: "userId are required",
        },
        { status: 400 }
      );
    }

    // Load seed.json
    const filePath = path.join(process.cwd(), "prisma", "seed.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const questions = JSON.parse(raw);

    // Ensure quiz exists

    const quiz = await prisma.quizz.create({
      data: {
        title: "AWS",
        description: "AWS Cloud Practitioner",
        createdById: userId,
      },
    });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Ensure user exists

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Insert questions
    const createdQuestions = [];
    for (const q of questions) {
      const inserted = await prisma.question.create({
        data: {
          question: q.question,
          answer: q.answer,
          explanation: q.explaination || "",
          hint: q.hint || "",
          correctAnswer: q.correctAnswer,
          options: q.options,
          nature: q.nature,
          quizzId: quiz.id,
        },
      });
      createdQuestions.push(inserted);
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
