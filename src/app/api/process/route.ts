import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
// import {
//   buildQuestionPrompt,
//   generateQuestionEnrichment,
//   logger,
// } from "@/lib/ollama";

// export async function POST() {
//   logger.info("Ollama worker started");

//   const pendingQuestions = await prisma.question.findMany({
//     where: { status: "pending", set: { language: "en" } },

//     take: 25,
//     orderBy: { id: "asc" },
//     select: {
//       id: true,
//       question: true,
//       options: true,
//       answer: true,
//       explanation: true,
//       set: {
//         select: { language: true },
//       },
//     },
//   });

//   if (pendingQuestions.length === 0) {
//     logger.info("No pending questions found");
//     return NextResponse.json({ processed: 0, failed: 0 });
//   }

//   let processed = 0;
//   let failed = 0;

//   for (const question of pendingQuestions) {
//     try {
//       logger.info(`Processing question ${question.id}`);

//       const prompt = buildQuestionPrompt({
//         question: question.question,
//         options: question.options,
//         answer: question.answer,
//         language: question.set.language,
//       });
//       const generation = await generateQuestionEnrichment(prompt);

//       // const mergedExplanation = question.explanation
//       //   ? `${question.explanation}\n\n${generation.explanation}`
//       //   : generation.explanation;

//       // if (question.explanation) {
//       //   logger.info(
//       //     `Appending generated explanation to existing text for question ${question.id}`
//       //   );
//       // }

//       await prisma.question.update({
//         where: { id: question.id },
//         data: {
//           hint: generation.hint,
//           // explanation: mergedExplanation,
//           status: "hint_done",
//         },
//       });

//       processed++;
//       logger.info(`Question ${question.id} processed`);
//     } catch (err: unknown) {
//       failed++;
//       if (err instanceof Error) {
//         console.log(err);
//         logger.error(
//           `Question ${question.id} failed: ${err?.message ?? "Unknown error"}`
//         );
//       }
//       await prisma.question.update({
//         where: { id: question.id },
//         data: { status: "error" },
//       });
//     }
//   }

//   logger.info(`Worker finished. Processed ${processed}, Failed ${failed}`);

//   return NextResponse.json({
//     processed,
//     failed,
//   });
// }

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        server: "running",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: `Database connection failed ${error}`,
      },
      { status: 503 }
    );
  }
}
