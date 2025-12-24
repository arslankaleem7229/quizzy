import Image from "next/image";
import { Badge } from "../types";

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const iconSrc = badge.locked
    ? badge.icon
    : badge.icon.replaceAll("locked-", "");
  const textColor = badge.locked ? "text-gray-300" : "text-gray-700";
  const translateClass = badge.translate
    ? "-translate-y-4.5 -translate-x-0.5"
    : "";

  return (
    <div className="w-38">
      <div className="items-center flex flex-col flex-nowrap text-center w-full">
        <div className="relative flex items-center justify-center w-full h-38">
          <Image
            src={iconSrc}
            alt={badge.title}
            fill
            className="object-contain h-12 w-12 items-center justify-center rounded-full text-sm font-semibold uppercase transition"
          />
          {badge.value && (
            <span
              className={`absolute text-2xl font-bold ${textColor} ${translateClass}`}
            >
              {badge.value}
            </span>
          )}
        </div>
        <div className="w-full flex flex-row flex-wrap text-center items-center justify-center">
          <p className="text-(--textColor) font-light">{badge.title}</p>
          {badge.subtitle && (
            <span className="text-(--grayText) text-xs">{badge.subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
