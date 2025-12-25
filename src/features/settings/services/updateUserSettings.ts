import { UserWithPreferenceResponse } from "@/types/api";
import { UpdateUserSettingsPayload, UpdateSettingsResult } from "../types";

export async function updateUserSettings(
  payload: UpdateUserSettingsPayload
): Promise<UpdateSettingsResult> {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
