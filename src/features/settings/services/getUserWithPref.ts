import { UserWithPreferenceResponse } from "@/types/api";
import { cookies } from "next/headers";

export async function getUserWithPref() {
  const res = await fetch(process.env.APP_URL + "/api/settings", {
    cache: "no-store",
    credentials: "include",
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (!res.ok) throw new Error("Failed to load user details");

  const data: UserWithPreferenceResponse = await res.json();

  if (!data.success) throw new Error("Something went wrong");

  return data.data;
}
