import { Prisma } from "@/app/generated/prisma";

export type QuizzGetPayload = Prisma.QuizzGetPayload<{
  include: {
    sets: {
      select: {
        title: true;
        description: true;
        language: true;
        _count: { select: { userQuizzAttempts: true; questions: true } };
      };
    };
    createdBy: {
      select: { id: true; name: true; image: true; email: true; type: true };
    };
  };
}>;

export type PaginationMeta = {
  limit: number;
  cursor?: string | null;
  nextCursor?: string | null;
  hasMore: boolean;
};

export type ReturnQuizzesOnly = {
  quizzes: QuizzGetPayload[];
  pagination: PaginationMeta;
};
