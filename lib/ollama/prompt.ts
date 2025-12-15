export type PromptInput = {
  question: string;
  options: string[];
  answer: string;
  language?: string | null;
};

export function buildQuestionPrompt({
  question,
  options,
  answer,
  language,
}: PromptInput) {
  const formattedOptions =
    options.length > 0
      ? options.map((option, index) => `${index + 1}. ${option}`).join("\n")
      : "No options provided.";

  const languageInstruction = language
    ? `Use ${language} in your response.`
    : "Use the same language as the input.";

  return `
You are an assistant that generates a helpful hint and a clear explanation for a multiple choice question.

Rules:
- Do NOT reveal the correct answer in the hint
- Explanation MAY mention the correct answer
- Do NOT invent facts
- Output valid JSON only
- ${languageInstruction}

Question:
${question}

Options:
${formattedOptions}

Correct answer:
${answer}

Return JSON:
{
  "hint": "...",
  "explanation": "...",
  "language": "..."
}
`;
}
