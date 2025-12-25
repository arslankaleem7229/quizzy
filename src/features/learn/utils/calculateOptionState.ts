import { QuizOption } from "@/lib/types";
import { QuestionStatus, OptionState } from "../types";

export function calculateOptionState(
  option: QuizOption,
  feedbackStatus: QuestionStatus | null,
  selectedOptionId: string | null,
  feedbackCorrectIds: string[]
): OptionState {
  if (feedbackStatus === "correct" && selectedOptionId === option.id) {
    return "correct";
  }

  if (feedbackStatus === "wrong") {
    if (selectedOptionId === option.id) return "wrong";
    if (feedbackCorrectIds.includes(option.id)) return "correct";
  }

  if (selectedOptionId === option.id) return "selected";

  return "idle";
}
