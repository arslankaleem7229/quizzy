import { Prisma } from "@/app/generated/prisma";
import {
  localizationWithQuestionsInclude,
  quizWithLocalizationInclude,
  quizWithoutLocalizationInclude,
  searchQuizInclude,
} from "./quiz.includes";

type QuizWithLocalizationPayload = Prisma.QuizGetPayload<{
  include: typeof quizWithLocalizationInclude;
}>;

type QuizWithoutLocalizationPayload = Prisma.QuizGetPayload<{
  include: typeof quizWithoutLocalizationInclude;
}>;

type LocalizationWithQuestionsPayload = Prisma.QuizLocalizationGetPayload<{
  include: typeof localizationWithQuestionsInclude;
}>;

type SearchQuizResultPayload = Prisma.QuizLocalizationGetPayload<{
  select: typeof searchQuizInclude;
}>;

export type QuizWithLocalization = QuizWithLocalizationPayload;
export type QuizWithoutLocalization = QuizWithoutLocalizationPayload;
export type LocalizationWithQuestions = LocalizationWithQuestionsPayload;
export type SearchQuizResult = SearchQuizResultPayload;

export type QuizCreator = QuizWithLocalization["createdBy"];
export type QuizLocalization = QuizWithLocalization["localizations"][number];
export type QuizQuestion = QuizLocalization["questions"][number];
export type QuizOption = QuizQuestion["options"][number];
export type QuizAttachment = QuizQuestion["attachments"][number];
