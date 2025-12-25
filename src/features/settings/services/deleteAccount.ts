import { DeleteAccountResponse } from "@/types/api";

export default async function deleteAccount() {
  const res = await fetch("/api/settings", {
    method: "Delete",
  });
  if (!res.ok) {
    throw new Error("Request failed");
  }

  const result: DeleteAccountResponse = await res.json();
  return result;
}
