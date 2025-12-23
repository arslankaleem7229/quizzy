"use client";

import { useEffect, useState } from "react";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

interface JobStatusBannerProps {
  status: JobStatus;
  message?: string;
  error?: string;
  onDismiss?: () => void;
  autoHideDuration?: number;
  actionLabel?: string;
  onAction?: () => void;
  stylingProps: string;
}

export function JobStatusBanner({
  status,
  message,
  error,
  onDismiss,
  autoHideDuration = 5000,
  actionLabel,
  onAction,
  stylingProps,
}: JobStatusBannerProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-hide only for completed status
  useEffect(() => {
    if (status === "completed" && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Wait for exit animation, then dismiss
        setTimeout(() => {
          onDismiss?.();
        }, 300);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [status, autoHideDuration, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  const configs = {
    pending: {
      emoji: "⏳",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      textColor: "text-yellow-800",
      title: "Job Queued",
      description: message || "Your request is in the queue...",
      animate: false,
    },
    processing: {
      emoji: "⚙️",
      bg: "bg-blue-50",
      border: "border-blue-200",
      textColor: "text-blue-800",
      title: "Processing",
      description: message || "AI is generating your content...",
      animate: true,
    },
    completed: {
      emoji: "✅",
      bg: "bg-green-50",
      border: "border-green-200",
      textColor: "text-green-800",
      title: "Success!",
      description: message || "Your content is ready",
      animate: false,
    },
    failed: {
      emoji: "❌",
      bg: "bg-red-50",
      border: "border-red-200",
      textColor: "text-red-800",
      title: "Failed",
      description: error || message || "Something went wrong",
      animate: false,
    },
  };

  const config = configs[status];

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.textColor}
      ${stylingProps}
        border-l-4 p-4 mb-6 rounded-lg shadow-sm
        transition-all duration-300 ease-in-out
        ${isExiting ? "animate-slide-up opacity-0" : "animate-slide-down"}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div
          className={`text-3xl shrink-0 ${
            config.animate ? "animate-spin-slow" : ""
          }`}
        >
          {config.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{config.title}</h3>
          <p className="text-sm opacity-90">{config.description}</p>

          {(status === "pending" || status === "processing") && (
            <p className="text-xs mt-2 opacity-75">
              You can close this page and come back later
            </p>
          )}
        </div>

        {/* Dismiss button */}
        {(status === "completed" || status === "failed") && (
          <button
            onClick={handleDismiss}
            className="text-current opacity-50 hover:opacity-100 transition-opacity shrink-0 text-xl leading-none"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        )}
        {status === "completed" && actionLabel && onAction && (
          <button
            onClick={onAction}
            className="ml-2 shrink-0 rounded-full bg-current/10 px-3 py-1 text-xs font-semibold hover:bg-current/20 transition"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {status === "processing" && (
        <div className="mt-3 w-full bg-blue-200 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-blue-600 w-0 animate-progress" />
        </div>
      )}
    </div>
  );
}
