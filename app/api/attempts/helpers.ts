import { localizationWithQuestionsInclude, LocalizationWithQuestions } from "@/lib/types/api";
import prisma from "@/prisma/client";
import {
  Prisma,
  QuestionType,
} from "@/app/generated/prisma/client";

export type QuestionWithOptions = Prisma.QuestionGetPayload<{
  include: { options: true };
}>;

export async function findLocalizationForAttempt(
  quizId: string,
  language?: string
): Promise<LocalizationWithQuestions | null> {
  const preferred = language
    ? await prisma.quizLocalization.findFirst({
        where: { quizId, language },
        include: localizationWithQuestionsInclude,
      })
    : null;

  if (preferred) return preferred;

  const english = await prisma.quizLocalization.findFirst({
    where: { quizId, language: "en" },
    include: localizationWithQuestionsInclude,
  });

  if (english) return english;

  return prisma.quizLocalization.findFirst({
    where: { quizId },
    include: localizationWithQuestionsInclude,
    orderBy: { language: "asc" },
  });
}

export function evaluateAnswerCorrectness(
  question: QuestionWithOptions,
  selectedOptionIds: string[]
) {
  const validIds = new Set(question.options.map((o) => o.id));
  for (const id of selectedOptionIds) {
    if (!validIds.has(id)) {
      throw new Error("Selected option is not part of this question");
    }
  }

  const correctIds = question.options
    .filter((o) => o.isCorrect)
    .map((o) => o.id);
  const selectedSet = new Set(selectedOptionIds);

  let isCorrect: boolean | null = null;

  if (correctIds.length > 0) {
    const matches =
      selectedSet.size === correctIds.length &&
      correctIds.every((id) => selectedSet.has(id));

    if (
      question.questionType === QuestionType.SINGLE_CHOICE ||
      question.questionType === QuestionType.TRUE_FALSE
    ) {
      isCorrect = matches;
    } else if (question.questionType === QuestionType.MULTIPLE_CHOICE) {
      isCorrect = matches;
    } else {
      isCorrect = matches;
    }
  }

  const pointsEarned = isCorrect ? question.points ?? 0 : 0;

  return { isCorrect, pointsEarned };
}

export async function calculateAttemptStats(
  attemptId: string,
  quizId: string,
  language: string
) {
  const [answers, questions] = await Promise.all([
    prisma.answer.findMany({
      where: { attemptId },
      select: { pointsEarned: true, questionId: true },
    }),
    prisma.question.findMany({
      where: { localization: { quizId, language } },
      select: { id: true, points: true },
    }),
  ]);

  const score = answers.reduce(
    (sum, answer) => sum + (answer.pointsEarned ?? 0),
    0
  );
  const maxScore = questions.reduce(
    (sum, question) => sum + (question.points ?? 0),
    0
  );

  const totalQuestions = questions.length;
  const answeredCount = answers.length;
  const percentage =
    maxScore > 0 ? Number(((score / maxScore) * 100).toFixed(2)) : null;

  return {
    score,
    maxScore,
    percentage,
    completed: totalQuestions > 0 && answeredCount >= totalQuestions,
    answeredCount,
    totalQuestions,
  };
}
