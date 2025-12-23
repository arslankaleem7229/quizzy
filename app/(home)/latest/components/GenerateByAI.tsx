"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";
import { JobStatus, JobStatusBanner } from "./JobStatusSnackbar";
import { getQuizzGenQueue } from "@/lib/worker/queue";

const MAX_CHARACTERS = 100000;
const DEFAULT_LANGUAGE = "en";

type AiJobResponse =
  | {
      success: true;
      data: {
        jobId: string;
        status: string;
        message?: string;
        estimatedTime?: string;
      };
    }
  | {
      success: false;
      error: { message: string };
    };

type JobUpdatePayload = {
  jobId: string;
  status: string;
  message?: string;
  error?: string;
  quizId?: string;
};

type JobsListResponse =
  | {
      success: true;
      data: {
        id: string;
        status: string;
        title?: string | null;
        description?: string | null;
        errorMessage?: string | null;
        quizId?: string | null;
      }[];
    }
  | { success: false; error: { message: string } };

type JobState = {
  jobId: string;
  status: JobStatus;
  message?: string;
  error?: string;
  quizId?: string;
};

const normalizeStatus = (status?: string): JobStatus => {
  const normalized = (status ?? "").toLowerCase();
  if (normalized === "processing") return "processing";
  if (normalized === "completed") return "completed";
  if (normalized === "failed") return "failed";
  return "pending";
};

const GenerateByAI = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<JobState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

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
        const res = await fetch("/api/jobs", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) return;

        const data: JobsListResponse = await res.json();

        if (!data.success) return;

        const activeJob = data.data.find(
          (item) => item.status.toLowerCase() !== "completed"
        );
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
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatestJob();
  }, []);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value.slice(0, MAX_CHARACTERS);
    setText(value);
    if (error) setError(null);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (error) setError(null);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFile(null);
  };

  const handleGenerate = async () => {
    if (isSubmitting) return;
    if (!text.trim() && !file) {
      setError("Add some study material or upload a file.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let response: Response;
      if (file) {
        const formData = new FormData();
        formData.append("language", DEFAULT_LANGUAGE);
        if (text.trim()) {
          formData.append("text", text.trim());
        }
        formData.append("file", file);

        response = await fetch("/api/quizz/ai", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
      } else {
        response = await fetch("/api/quizz/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.trim(),
            language: DEFAULT_LANGUAGE,
          }),
          credentials: "include",
        });
      }

      const payload: AiJobResponse = await response.json();

      console.log(payload);

      if (!payload.success) {
        const message =
          "error" in payload ? payload.error.message : "Failed to start AI job";
        throw new Error(message);
      }

      if (!response.ok) {
        throw new Error("Failed to start AI job");
      }

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
  };

  const handleDismissStatus = () => {
    setJob(null);
  };

  const canSubmit = Boolean(text.trim() || file) && !isSubmitting;
  const characterCount = text.length.toLocaleString();

  return (
    <div className="px-1 md:px-3 flex flex-col items-end">
      <div className="flex w-full items-center gap-2 text-md font-base text-(--textColor)/80">
        Generate a
        <span className="tracking-wide btn-text py-0 px-0 text-base font-bold">
          flashcard set
        </span>
      </div>

      {job && (
        <JobStatusBanner
          stylingProps=" fixed bottom-6 right-6 z-50"
          status={job.status}
          message={job.message}
          error={job.error}
          onDismiss={handleDismissStatus}
          actionLabel={job.quizId ? "View set" : undefined}
          onAction={
            job.quizId
              ? () => router.push(`/flashcard-set/${job.quizId}`)
              : undefined
          }
        />
      )}

      {error && (
        <div className="mt-2 w-full rounded-md bg-red-500/10 border border-red-500/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-3 w-full rounded-lg border-2 border-transparent bg-(--cardColor) px-3 py-2 transition focus-within:border-(--foreground)/40 relative">
        <textarea
          value={text}
          onChange={handleTextChange}
          className="h-32 w-full resize-none text-base text-(--textColor) placeholder-(--foreground)/40 outline-none bg-transparent"
          placeholder="Paste your notes here. We'll do the rest."
          maxLength={MAX_CHARACTERS}
          disabled={isSubmitting}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept=".txt,.md,.pdf,.doc,.docx,.csv,.rtf,.html"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <button
            className="text-sm font-medium text-(--textColor)/70 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 disabled:opacity-60"
            type="button"
            onClick={triggerFilePicker}
            disabled={isSubmitting}
          >
            {file ? "Change file" : "Upload a file"}
          </button>
          {file && (
            <button
              type="button"
              onClick={clearFile}
              className="text-xs text-(--textColor)/50 hover:text-(--textColor)/80 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Remove
            </button>
          )}
        </div>
        <button
          className="absolute bottom-3 right-3 bg-(--primary) hover:bg-(--primaryHover) rounded-full p-4 transition disabled:opacity-50 flex items-center justify-center"
          onClick={handleGenerate}
          disabled={!canSubmit}
          type="button"
          aria-label="Generate flashcard set with AI"
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaArrowRight />
          )}
        </button>
      </div>

      <div className="mt-1 w-full flex flex-wrap items-center gap-2 text-(--textColor)/40 text-sm">
        <span>
          {characterCount}/{MAX_CHARACTERS.toLocaleString()} characters
        </span>
        {file && <span className="text-(--textColor)/60">• {file.name}</span>}
      </div>
    </div>
  );
};

export default GenerateByAI;
