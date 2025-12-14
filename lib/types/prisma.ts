import { Prisma } from "@/app/generated/prisma";

export type AccountRecord = Prisma.AccountGetPayload<object>;
export type SessionRecord = Prisma.SessionGetPayload<object>;
export type UserRecord = Prisma.UserGetPayload<object>;
export type VerificationTokenRecord =
  Prisma.VerificationTokenGetPayload<object>;
export type ReviewRecord = Prisma.ReviewGetPayload<object>;
export type AttachmentRecord = Prisma.AttachmentGetPayload<object>;
export type QuestionRecord = Prisma.QuestionGetPayload<object>;
export type UserAnswerRecord = Prisma.UserAnswerGetPayload<object>;
export type UserQuizAttemptRecord =
  Prisma.UserQuizzAttemptGetPayload<object>;

const quizListSelection = Prisma.validator<Prisma.QuizzDefaultArgs>()({
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
export type QuizListEntry = Prisma.QuizzGetPayload<typeof quizListSelection>;

const quizDetailSelection = Prisma.validator<Prisma.QuizzDefaultArgs>()({
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
export type QuizDetail = Prisma.QuizzGetPayload<typeof quizDetailSelection>;

const questionWithAssociationsSelection =
  Prisma.validator<Prisma.QuestionDefaultArgs>()({
    include: {
      attachments: true,
      userAnswers: true,
      set: { select: { id: true, quizzId: true, title: true, language: true } },
    },
  });
export type QuestionWithAssociations = Prisma.QuestionGetPayload<
  typeof questionWithAssociationsSelection
>;

const quizAttemptWithDetailsSelection =
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
export type QuizAttemptWithDetails = Prisma.UserQuizzAttemptGetPayload<
  typeof quizAttemptWithDetailsSelection
>;

export type PaginationInfo = {
  limit: number;
  cursor?: string | null;
  nextCursor?: string | null;
  hasMore: boolean;
};

export type QuizListResponse = {
  quizzes: QuizListEntry[];
  pagination: PaginationInfo;
};

export type RecentQuizAttempts = QuizAttemptWithDetails[];

export type QuizListSetSummary = QuizListEntry["sets"][number];
export type QuizDetailSet = QuizDetail["sets"][number];
export type QuizDetailQuestion = QuizDetailSet["questions"][number];
export type QuizDetailAttempt = QuizDetailSet["userQuizzAttempts"][number];
export type QuizAuthor = QuizDetail["createdBy"];
