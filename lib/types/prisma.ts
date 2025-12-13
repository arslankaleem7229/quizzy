import { Prisma } from "@/app/generated/prisma";

export type AccountPayload = Prisma.AccountGetPayload<object>;
export type SessionPayload = Prisma.SessionGetPayload<object>;
export type UserPayload = Prisma.UserGetPayload<object>;
export type VerificationTokenPayload =
  Prisma.VerificationTokenGetPayload<object>;
export type ReviewPayload = Prisma.ReviewGetPayload<object>;
export type AttachmentPayload = Prisma.AttachmentGetPayload<object>;
export type QuestionPayload = Prisma.QuestionGetPayload<object>;
export type UserAnswerPayload = Prisma.UserAnswerGetPayload<object>;
export type UserQuizzAttemptPayload = Prisma.UserQuizzAttemptGetPayload<object>;

const quizzListArgs = Prisma.validator<Prisma.QuizzDefaultArgs>()({
  include: {
    sets: {
      select: {
        title: true,
        description: true,
        language: true,
        _count: { select: { userQuizzAttempts: true, questions: true } },
      },
    },
    createdBy: {
      select: { id: true, name: true, image: true, email: true, type: true },
    },
  },
});
export type QuizzGetPayload = Prisma.QuizzGetPayload<typeof quizzListArgs>;

const quizzSetArgs = Prisma.validator<Prisma.QuizzDefaultArgs>()({
  include: {
    _count: { select: { reviews: true } },
    sets: {
      where: { language: "en" },
      include: {
        questions: true,
        userQuizzAttempts: true,
      },
    },
    createdBy: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
        type: true,
      },
    },
  },
});
export type FullQuizzResponse = Prisma.QuizzGetPayload<typeof quizzSetArgs>;

const questionWithRelationsArgs =
  Prisma.validator<Prisma.QuestionDefaultArgs>()({
    include: {
      attachments: true,
      userAnswers: true,
      set: { select: { id: true, quizzId: true, title: true, language: true } },
    },
  });
export type QuestionWithRelations = Prisma.QuestionGetPayload<
  typeof questionWithRelationsArgs
>;

const userAttemptWithRelationsArgs =
  Prisma.validator<Prisma.UserQuizzAttemptDefaultArgs>()({
    include: {
      answers: true,
      set: {
        include: {
          quizz: true,
          questions: true,
        },
      },
      user: true,
    },
  });
export type UserAttemptWithRelations = Prisma.UserQuizzAttemptGetPayload<
  typeof userAttemptWithRelationsArgs
>;

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

export type ReturnRecentAttempts = UserAttemptWithRelations[];

export type QuizzListItem = ReturnQuizzesOnly["quizzes"][number];
export type QuizzListSet = QuizzListItem["sets"][number];
export type FullQuizz = FullQuizzResponse;
export type FullQuizzSet = FullQuizz["sets"][number];
export type FullQuestion = FullQuizzSet["questions"][number];
export type FullAttempt = FullQuizzSet["userQuizzAttempts"][number];
export type CreatedBy = FullQuizzResponse["createdBy"];
