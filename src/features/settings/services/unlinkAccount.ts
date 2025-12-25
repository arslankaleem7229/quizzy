import { UserWithPreferenceResponse } from "@/types/api";
import { UpdateSettingsResult, AccountSettingsPayload } from "../types";

export async function unlinkAccount(
  payload: AccountSettingsPayload
): Promise<UpdateSettingsResult> {
  const res = await fetch("/api/settings/unlink", {
    method: "Delete",
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
