import z from "zod";

export const updateSchema = z.object({
  rating: z.number().int().min(1).max(5),
});

export const reviewSchema = z.object({
  quizId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
});
