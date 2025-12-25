"use client";

import { useCallback } from "react";
import { Calendar, type TileArgs } from "react-calendar";
import styles from "../styles/Calender.module.css";
import StreakImage from "@/public/achivements/streak-flame.svg";
import Image from "next/image";

const STREAK_YEAR = 2025;
const STREAK_MONTH = 11; // December (0-indexed)

const streakDays: Set<number> = new Set([
  new Date(2025, 11, 3).getTime(),
  new Date(2025, 11, 8).getTime(),
  new Date(2025, 11, 13).getTime(),
  new Date(2025, 10, 5).getTime(),
]);

export default function CustomCalendar() {
  const streakWeeks = Array.from(streakDays).map((date) => {
    const streakDate = startOfDay(new Date(date));
    const weekStart = startOfWeekSunday(streakDate);
    const weekEnd = addDays(weekStart, 6);
    return { weekStart, weekEnd };
  });

  const tileContent = useCallback(({ date, view }: TileArgs) => {
    if (view !== "month") return null;

    if (streakDays.has(date.getTime())) {
      return (
        <Image
          src={StreakImage}
          alt={"streakImage"}
          aria-hidden
          className={styles.fire}
        />
      );
    }

    return null;
  }, []);

  return (
    <div className={styles.wrapper} aria-label="Study activity calendar">
      <Calendar
        defaultValue={new Date(STREAK_YEAR, STREAK_MONTH, 3)}
        defaultActiveStartDate={new Date(STREAK_YEAR, STREAK_MONTH, 1)}
        showNeighboringMonth={true}
        maxDetail="month"
        prev2Label={null}
        next2Label={null}
        defaultView="month"
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          if (view !== "month") return null;

          const currentDay = startOfDay(date).getTime();

          let matchedWeek = null;

          for (const w of streakWeeks) {
            const start = w.weekStart.getTime();
            const end = w.weekEnd.getTime();

            if (currentDay >= start && currentDay <= end) {
              matchedWeek = { start, end };
              break;
            }
          }

          if (!matchedWeek) return null;

          const { start, end } = matchedWeek;

          if (currentDay === start) return styles.streak_week_start;
          if (currentDay === end) return styles.streak_week_end;

          return styles.streak_week;
        }}
        formatWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        locale="en-US"
        tileDisabled={({ date, view, activeStartDate }) => {
          if (view !== "month") return false;
          if (!activeStartDate) return false;
          return !isSameMonth(date, activeStartDate);
        }}
        minDetail="month"
        className={`mx-auto ${styles.calendar}`}
      />
    </div>
  );
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfWeekSunday(date: Date) {
  const next = startOfDay(date);
  const diff = next.getDay(); // 0 is Sunday
  next.setDate(next.getDate() - diff);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return startOfDay(next);
}

function isSameMonth(date: Date, activeStartDate?: Date | null) {
  const compare = activeStartDate ?? new Date(STREAK_YEAR, STREAK_MONTH, 1);
  return (
    date.getFullYear() === compare.getFullYear() &&
    date.getMonth() === compare.getMonth()
  );
}
