import { JobsListResponse } from "../types";

export async function fetchJobs() {
  try {
    const response = await fetch("/api/jobs", {
      cache: "no-store",
      credentials: "include",
    });
    if (!response.ok) return null;

    const data: JobsListResponse = await response.json();

    if (!data.success) return null;

    const activeJob = data.data.find(
      (item) => item.status.toLowerCase() !== "completed"
    );
    if (!activeJob) return null;
    else return activeJob;
  } catch {
    return null;
  }
}
