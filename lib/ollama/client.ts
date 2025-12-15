import { logger } from "./logger";

export type OllamaGeneration = {
  hint: string;
  explanation: string;
  language: string;
};

const OLLAMA_URL =
  process.env.OLLAMA_URL ?? "http://host.docker.internal:11434/api/generate";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "mistral:7b-instruct";

export async function generateQuestionEnrichment(
  prompt: string
): Promise<OllamaGeneration> {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      format: "json",
      stream: false,
      options: {
        temperature: 0.3,
        num_predict: 200,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Ollama request failed (${response.status}): ${errorBody}`.trim()
    );
  }

  const data = await response.json();

  let parsed: unknown;
  try {
    parsed =
      typeof data.response === "string"
        ? JSON.parse(data.response)
        : data.response;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      logger.error(`/n/n${data.response}`);
    }
    throw new Error("Failed to parse Ollama response JSON");
  }

  const generation = validateGeneration(parsed);
  return generation;
}

function validateGeneration(payload: unknown): OllamaGeneration {
  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as Record<string, unknown>).hint !== "string" ||
    typeof (payload as Record<string, unknown>).explanation !== "string" ||
    typeof (payload as Record<string, unknown>).language !== "string"
  ) {
    throw new Error("Ollama response missing required fields");
  }

  const { hint, explanation, language } = payload as Record<string, string>;
  return { hint, explanation, language };
}
