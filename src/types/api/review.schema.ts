import z from "zod";

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
});

export const createReviewSchema = z.object({
  quizId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
});
