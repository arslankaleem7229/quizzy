import { AiJobResponse } from "../types";

export default async function saveJob({
  file,
  language,
  text,
}: {
  file: File | null;
  language: string;
  text: string;
}) {
  let response: Response;
  if (file) {
    const formData = new FormData();
    formData.append("language", language);
    if (text.trim()) {
      formData.append("text", text.trim());
    }
    formData.append("file", file);

    response = await fetch("/api/quizz/ai", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  } else {
    response = await fetch("/api/quizz/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.trim(),
        language,
      }),
      credentials: "include",
    });
  }

  const payload: AiJobResponse = await response.json();

  if (!payload.success) {
    const message =
      "error" in payload ? payload.error.message : "Failed to start AI job";
    throw new Error(message);
  }

  if (!response.ok) {
    throw new Error("Failed to start AI job");
  }

  return payload;
}
