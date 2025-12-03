"use client";

import { FlagIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type AnswerOption = {
  id: number;
  label: string;
  description: string;
};

const progressSegments = Array.from({ length: 10 }, (_, idx) => idx);

const answers: AnswerOption[] = [
  {
    id: 1,
    label:
      "Training company employees on AWS & configuring infrastructure devices",
    description: "",
  },
  {
    id: 2,
    label: "Deploying an application in multiple availability zones",
    description: "",
  },
  {
    id: 3,
    label: "Managing AWS Identity and Access Management (IAM)",
    description: "",
  },
  {
    id: 4,
    label:
      "Maintaining virtualization infrastructure & configuring AWS infrastructure devices",
    description: "",
  },
];

const LearnPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [progress] = useState(0);

  return (
    <main className="flex w-full mx-auto min-h-screen bg-(--background) text-(--textColor)">
      <section className="flex flex-1 flex-col max-w-7xl  items-center mx-auto px-4 pb-10 pt-6 lg:px-14">
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            {progressSegments.map((segment) => (
              <div
                key={segment}
                className={`h-2 flex-1 rounded-full ${
                  segment < progress
                    ? "bg-linear-to-r from-emerald-300 to-sky-400"
                    : segment === progress
                    ? "bg-linear-to-r from-indigo-400 via-pink-400 to-pink-600"
                    : "bg-(--foreground)/10"
                }`}
              />
            ))}
            <span className="ml-2 rounded-full bg-(--foreground)/15 px-3 py-1 text-xs text-(--textColor)">
              556
            </span>
          </div>

          <div className="flex flex-col rounded-xl bg-(--capsule) px-8 py-5 gap-5 min-h-[60vh]">
            <div>
              <span className="text-sm">Term</span>
            </div>

            <h1 className="flex-1 flex text-xl tracking-wide font-light">
              Which tasks are the responsibilities of AWS? (TWO)
            </h1>

            <div className="flex-3 flex flex-col gap-3 justify-end">
              <p className="text-sm text-(--grayText)">Choose an answer</p>
              <div className="grid gap-4 md:grid-cols-2">
                {answers.map((answer) => {
                  const isSelected = selectedAnswer === answer.id;
                  return (
                    <button
                      key={answer.id}
                      onClick={() => setSelectedAnswer(answer.id)}
                      className={`flex rounded-lg border-2 px-4 py-3 gap-5 items-center text-left transition ${
                        isSelected
                          ? "border-(--primary) bg-(--primary)/10 text-white"
                          : "border-(--grayText)/15 bg-transparent text-(--forground) hover:border-(--forground)/40"
                      }`}
                    >
                      <span>{answer.id.toString().padStart(2, "")}</span>
                      <p className="text-[15px] font-light">{answer.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-4 text-sm text-(--grayText)">
              <button className="inline-flex items-center gap-2 rounded-full border border-(--forground)/15 px-4 py-2 text-(--grayText)">
                <SpeakerWaveIcon className="h-5 w-5" />
                Listen
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-(--forground)/15 px-4 py-2 text-(--grayText)">
                <FlagIcon className="h-5 w-5" />
                Report
              </button>
              <button className="text-(--primary)">Don&apos;t know?</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LearnPage;
