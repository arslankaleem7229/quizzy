import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";
import { AiJobResponse, JobState, JobUpdatePayload, JobStatus } from "../types";
import { fetchJobs } from "../services/fetchJobs";
import saveJob from "../services/saveJob";

export const QUIZ_GENERATION_MAX_CHARACTERS = 100000;
export const DEFAULT_QUIZ_LANGUAGE = "en";

const normalizeStatus = (status?: string): JobStatus => {
  const normalized = (status ?? "").toLowerCase();
  if (normalized === "processing") return "processing";
  if (normalized === "completed") return "completed";
  if (normalized === "failed") return "failed";
  return "pending";
};

export function useQuizGeneration(language = DEFAULT_QUIZ_LANGUAGE) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<JobState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;
    socket.emit("join-user-room", session.user.id);
  }, [session?.user?.id]);

  useEffect(() => {
    const handler = (payload: JobUpdatePayload) => {
      setJob((prev) => {
        if (prev && payload.jobId && prev.jobId !== payload.jobId) {
          return prev;
        }

        const status = normalizeStatus(payload.status);

        return {
          jobId: payload.jobId || prev?.jobId || "",
          status,
          message: payload.message ?? prev?.message,
          error: payload.error ?? prev?.error,
          quizId: payload.quizId ?? prev?.quizId,
        };
      });
    };

    socket.on("job-update", handler);
    return () => {
      socket.off("job-update", handler);
    };
  }, []);

  useEffect(() => {
    const fetchLatestJob = async () => {
      try {
        const activeJob = await fetchJobs();
        if (!activeJob) return;
        const status = normalizeStatus(activeJob.status);
        setJob({
          jobId: activeJob.id,
          status,
          message:
            activeJob.title ||
            activeJob.description ||
            "AI is generating your quiz...",
          error: activeJob.errorMessage ?? undefined,
          quizId: activeJob.quizId ?? undefined,
        });

        socket.emit("subscribe-job", activeJob.id);
      } catch {
        return;
      }
    };

    fetchLatestJob();
  }, []);

  const updateText = useCallback(
    (value: string) => {
      const normalized = value.slice(0, QUIZ_GENERATION_MAX_CHARACTERS);
      setText(normalized);
      if (error) setError(null);
    },
    [error]
  );

  const selectFile = useCallback(
    (selectedFile: File | null) => {
      setFile(selectedFile);
      if (error) setError(null);
    },
    [error]
  );

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const clearFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
  }, []);

  const startGeneration = useCallback(async () => {
    if (isSubmitting) return;
    if (!text.trim() && !file) {
      setError("Add some study material or upload a file.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = await saveJob({
        file: file,
        language: language,
        text: text,
      });
      if (!payload) return;
      const nextStatus = normalizeStatus(payload.data.status);
      const jobId = payload.data.jobId;

      setJob({
        jobId,
        status: nextStatus,
        message: payload.data.message ?? "Quiz generation started",
      });

      socket.emit("subscribe-job", jobId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message || "Failed to start AI job"
          : "Failed to start AI job"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [file, isSubmitting, language, text]);

  const dismissJob = useCallback(() => {
    setJob(null);
  }, []);

  const canSubmit = Boolean(text.trim() || file) && !isSubmitting;
  const characterCount = text.length;

  return {
    text,
    file,
    error,
    job,
    isSubmitting,
    fileInputRef,
    maxCharacters: QUIZ_GENERATION_MAX_CHARACTERS,
    characterCount,
    canSubmit,
    updateText,
    selectFile,
    openFilePicker,
    clearFile,
    startGeneration,
    dismissJob,
  };
}
