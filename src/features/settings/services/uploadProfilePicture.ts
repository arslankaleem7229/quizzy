import { UserWithPreferenceResponse } from "@/types/api";
import { UpdateSettingsResult } from "../types";

export async function uploadProfilePicture(
  file: File
): Promise<UpdateSettingsResult> {
  const formData = new FormData();
  formData.append("profilePicture", file);

  const res = await fetch("/api/settings", {
    method: "PATCH",
    body: formData,
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
