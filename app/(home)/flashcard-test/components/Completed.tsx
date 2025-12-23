import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import ConfettiIcon from "@/public/icons/confetti-icon.svg";
import Image from "next/image";
import { CheckCircle2Icon, CircleX } from "lucide-react";
import Link from "next/link";
import ConfettiOnMount from "./ConfettiOnMount";
import { GetAttemptResponse } from "@/lib/types/api";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

type CompletedProps = {
  totalQuestions?: number;
  completedCount?: number;
  remainingQuestion?: number;
  quizId: string | null | undefined;
  attemptId?: string | null | undefined;
  onRestart?: () => void;
  onBack?: () => void;
};

export default function Completed({
  totalQuestions,
  completedCount = totalQuestions,
  remainingQuestion = 0,
  onRestart,
  quizId,
  attemptId,
  onBack,
}: CompletedProps) {
  const isAttempt: boolean = !!attemptId;
  const [maxScrore, setMaxScore] = useState(0);
  const [obtainedScore, setObtainedScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/attempts/${attemptId}`, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        const parsed: GetAttemptResponse = await response.json();

        if (!parsed.success) return;

        setMaxScore(parsed.data.maxScore ?? 0);
        setObtainedScore(parsed.data.score ?? 0);
      } catch (error) {
        console.log(error);
      }
    };
    if (isAttempt) {
      fetchData();
    }
  }, []);

  return (
    <>
      <section
        className={`flex flex-col gap-10  max-w-5xl w-full pb-5 sm:px-5 md:px-10 ${
          isAttempt && "mx-auto"
        }`}
      >
        <ConfettiOnMount />
        <div className="flex flex-row md:gap-20 gap-10 justify-between items-center">
          <h1 className="flex text-2xl font-medium md:text-[2rem]">
            {`Way to go! You've ${
              isAttempt ? "attempted all questions" : "reviewed all the cards."
            }`}
          </h1>
          <div className="md:w-[45%]">
            <div className="flex relative justify-end ">
              <Image
                src={ConfettiIcon}
                alt="party-popper"
                className="w-25 h-19 md:w-40 md:h-26 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:flex-row">
          <ResultStats
            totalQuestions={isAttempt ? maxScrore ?? 0 : completedCount ?? 0}
            completedCount={isAttempt ? obtainedScore ?? 0 : 0}
            quizId={quizId}
            attemptId={attemptId}
          />

          {!isAttempt && (
            <ActionsRequired
              onRestart={onRestart}
              quizId={quizId}
              attemptId={""}
            />
          )}
        </div>

        {!isAttempt && (
          <div className="flex flex-row text-sm pt-5 justify-between font-medium">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 transition"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to the last question
            </button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 transition "
            >
              Press any key to continue
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function ActionsRequired({ onRestart, quizId, attemptId }: CompletedProps) {
  const isAttempt = !!attemptId;
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-bold">Next steps</p>
      <Link
        type="button"
        aria-disabled={isAttempt}
        href={`/${isAttempt ? "flashcard-test" : "learn"}/${quizId}`}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-(--primary) px-6 py-3 font-semibold transition hover:bg-(--primaryHover)"
      >
        <SparklesIcon className="h-4 w-4" />
        Practise with questions
      </Link>
      <button
        type="button"
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-(--cardColor) px-6 py-3 font-semibold  transition hover:bg-(--cardColorHover)"
      >
        Restart Flashcards
      </button>
    </div>
  );
}

function ResultStats({
  totalQuestions,
  completedCount,
  quizId,
  attemptId,
}: CompletedProps) {
  const isAttempt = !!attemptId;
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="text font-bold">How you&apos;re doing</p>
      <div className="flex flex-row gap-5 h-25">
        {isAttempt &&
        (completedCount ??
          0 < (totalQuestions ?? 0) - (completedCount ?? 0)) ? (
          <CircleX className="flex w-25 h-full text-red-500" />
        ) : (
          <CheckCircle2Icon className="flex w-25 h-full text-emerald-300" />
        )}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between rounded-full font-medium bg-emerald-300/20 text-emerald-300 px-4 py-1 text-sm">
            <span>{isAttempt ? "Answered Correctly" : "Completed"}</span>
            <span>{isAttempt ? completedCount : totalQuestions}</span>
          </div>
          <div
            className={`flex items-center justify-between rounded-full font-medium ${
              isAttempt ? "bg-red-500/20" : "bg-white/10"
            } px-4 py-1 text-sm`}
          >
            <span>{isAttempt ? "Wrong Answers" : "Terms remaining"}</span>
            <span>{(totalQuestions ?? 0) - (completedCount ?? 0)}</span>
          </div>
          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
}
