import React from "react";
import AchivementSectionCard from "./AchivementSectionCard";
import { studyingBadges } from "../data";
import Image from "next/image";

const StudyingSection = () => {
  return (
    <AchivementSectionCard title="Studying">
      <div className="py-6 px-4 md:p-16">
        <div className="flex flex-row flex-wrap pb-8 gap-x-8 gap-y-12 justify-start">
          {studyingBadges.map((badge) => (
            <div key={badge.id} className="w-38">
              <div
                key={badge.id}
                className="items-center flex flex-col flex-nowrap text-center w-full"
              >
                <div className="relative w-full h-38">
                  <Image
                    src={badge.icon}
                    alt={badge.title}
                    fill
                    className={`object-contain h-12 w-12 items-center justify-center rounded-full text-sm font-semibold uppercase transition`}
                  />
                </div>
                <div className="w-full flex flex-row flex-wrap text-center items-center justify-center">
                  <p className="text-(--textColor) font-light">{badge.title}</p>
                  <span className="text-(--grayText) text-xs">
                    {badge.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AchivementSectionCard>
  );
};

export default StudyingSection;
