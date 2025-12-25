"use client";

import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { JobStatusBanner } from "./JobStatusSnackbar";
import { useQuizGeneration } from "../hooks";

export function GenerateByAI() {
  const router = useRouter();

  const {
    text,
    file,
    error,
    job,
    isSubmitting,
    fileInputRef,
    maxCharacters,
    characterCount,
    canSubmit,
    updateText,
    selectFile,
    openFilePicker,
    clearFile,
    startGeneration,
    dismissJob,
  } = useQuizGeneration();

  const formattedCharacterCount = characterCount.toLocaleString();
  const formattedMaxCharacters = maxCharacters.toLocaleString();

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
          onDismiss={dismissJob}
          actionLabel={job.quizId ? "View set" : undefined}
          onAction={
            job.quizId
              ? () => router.push(`/flashcard-sets/${job.quizId}`)
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
          onChange={(event) => updateText(event.target.value)}
          className="h-32 w-full resize-none text-base text-(--textColor) placeholder-(--foreground)/40 outline-none bg-transparent"
          placeholder="Paste your notes here. We'll do the rest."
          maxLength={maxCharacters}
          disabled={isSubmitting}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
          className="hidden"
          accept=".txt,.md,.pdf,.doc,.docx,.csv,.rtf,.html"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <button
            className="text-sm font-medium text-(--textColor)/70 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 disabled:opacity-60"
            type="button"
            onClick={openFilePicker}
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
          onClick={startGeneration}
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
          {formattedCharacterCount}/{formattedMaxCharacters} characters
        </span>
        {file && <span className="text-(--textColor)/60">• {file.name}</span>}
      </div>
    </div>
  );
}
