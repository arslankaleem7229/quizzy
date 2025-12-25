import { FlashcardCard, ValidationResult } from "../types";

export function validateCards(
  cards: FlashcardCard[],
  title: string
): ValidationResult {
  const normalizedCards = cards
    .map((card) => ({
      ...card,
      term: card.term.trim(),
      definition: card.definition.trim(),
      hint: card.hint?.trim(),
      explanation: card.explanation?.trim(),
    }))
    .filter((card) => card.term || card.definition);

  if (!title.trim()) {
    return { isValid: false, message: "Please add a title for your set." };
  }

  if (normalizedCards.length === 0) {
    return { isValid: false, message: "Add at least one flashcard." };
  }

  if (normalizedCards.some((card) => !card.term || !card.definition)) {
    return {
      isValid: false,
      message: "Every card needs both a term and a definition.",
    };
  }

  return { isValid: true, cards: normalizedCards };
}
