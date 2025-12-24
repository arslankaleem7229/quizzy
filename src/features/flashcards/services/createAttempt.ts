import { CreateAttemptPayload } from "../types";
import { cookies } from "next/headers";

export async function createAttempt({
  quizId,
  language,
}: CreateAttemptPayload) {
  const cookieHeader = (await cookies()).toString();

  try {
    const result = await fetch(process.env.APP_URL + "/api/attempts", {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify({ quizId: quizId, language: language }),
    });

    console.log(await result.json());
  } catch (error) {
    console.error("Failed to log recent attempt", error);
  }
}
