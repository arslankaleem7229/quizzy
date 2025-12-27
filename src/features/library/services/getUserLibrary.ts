import { SearchQuizResult } from "@/lib/types";
import { SearchResponse } from "@/types/api";
import { cookies } from "next/headers";

export default async function getUserLibrary() {
  let results: SearchQuizResult[] = [];
  try {
    const cookieHeader = (await cookies()).toString();
    const res = await fetch(process.env.APP_URL + `/api/library`, {
      cache: "no-store",
      method: "GET",
      credentials: "include",
      headers: { cookie: cookieHeader },
    });

    if (res.ok) {
      const json: SearchResponse = await res.json();

      if (json.success) {
        results = json.data ?? [];
      }
    }
  } catch (error) {
    throw error;
  }
  return results;
}
