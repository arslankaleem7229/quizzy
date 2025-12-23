import { JobStatus } from "@/app/generated/prisma";
import { Queue } from "bullmq";
import Redis from "ioredis";

// const connection = new Redis({
//   host: process.env.REDIS_HOST || "localhost",
//   port: parseInt(process.env.REDIS_PORT || "6379"),
//   password: process.env.REDIS_PASSWORD,
//   maxRetriesPerRequest: null,
//   enableReadyCheck: false,
// });

// connection.on("connect", () => {
//   console.log("Redis connected successfully");
// });

// connection.on("error", (err) => {
//   console.error("Redis connection error:", err);
// });

export interface GenAIJobData {
  jobId: string;
  userId: string;
  title?: string;
  description?: string;
  language?: string;
  inputText?: string;
  fileName?: string;
}

export interface JobUpdatePayload {
  jobId: string;
  status: JobStatus;
  quizId?: string;
  error?: string;
}

// export const quizzGenQueue = new Queue<GenAIJobData>("quizz-generation", {
//   connection,
//   defaultJobOptions: {
//     attempts: 3,
//     backoff: {
//       type: "exponential",
//       delay: 2000,
//     },
//     removeOnComplete: {
//       age: 24 * 3600,
//       count: 1000,
//     },
//     removeOnFail: {
//       age: 7 * 24 * 3600,
//     },
//   },
// });

// console.log("Flashcard queue initialized");

// console.log("[Queue] AI generation queue initialized");

// if (typeof window === "undefined") {
//   console.log("Initializing worker...");
//   // entring from node server.ts wont recognise @ and breaks
//   import("@/src/workers/gen-ai-worker")
//     .then((module) => {
//       console.log("[Queue] Worker module loaded:", Object.keys(module));
//       console.log("[Queue] Worker started successfully");
//     })
//     .catch((err) => {
//       console.error("[Queue] Failed to import worker:", err);
//       console.error("[Queue] Error stack:", err.stack);
//       console.error("[Queue] Error message:", err.message);
//     });
// }

let queue: Queue | null = null;

export function getQuizzGenQueue() {
  if (!process.env.REDIS_HOST) {
    throw new Error("REDIS_HOST not configured");
  }

  if (!queue) {
    const connection = new Redis({
      host: process.env.REDIS_HOST!,
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    queue = new Queue("quizz-generation", {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: { age: 24 * 3600, count: 1000 },
        removeOnFail: { age: 7 * 24 * 3600 },
      },
    });
    console.log("[Queue] Initialized");

    if (typeof window === "undefined") {
      console.log("Initializing worker...");
      // entring from node server.ts wont recognise @ and breaks
      import("./gen-ai-worker")
        .then((module) => {
          console.log("[Queue] Worker module loaded:", Object.keys(module));
          console.log("[Queue] Worker started successfully");
        })
        .catch((err) => {
          console.error("[Queue] Failed to import worker:", err);
          console.error("[Queue] Error stack:", err.stack);
          console.error("[Queue] Error message:", err.message);
        });
    }
  }

  return queue;
}
