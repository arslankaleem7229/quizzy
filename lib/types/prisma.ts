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

export type FullQuizzPayload = Prisma.QuizzGetPayload<{
  include: {
    sets: {
      include: {
        questions: true;
        userQuizzAttempts: true;
      };
    };
    createdBy: {
      select: {
        id: true;
        name: true;
        email: true;
        image: true;
        username: true;
        type: true;
      };
    };
  };
}>;

export type QuizzSetPayload = Prisma.QuizzSetGetPayload<{
  include: {
    questions: true;
    quizz: {
      select: {
        id: true;
        slug: true;
        createdBy: true;
        _count: { select: { reviews: true } };
      };
    };
    userQuizzAttempts: true;
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

export type ReturnSpecificQuizz = {
  quizz: FullQuizzPayload;
};
