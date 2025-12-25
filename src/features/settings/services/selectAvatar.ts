import { UserWithPreferenceResponse } from "@/types/api";
import { UpdateSettingsResult } from "../types";

export async function selectAvatarImage(
  url: string
): Promise<UpdateSettingsResult> {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const result: UserWithPreferenceResponse = await res.json();

  if (result.success) {
    return {
      success: true,
      user: result.data,
    };
  } else {
    return {
      success: false,
      error: result.error.message,
    };
  }
}
