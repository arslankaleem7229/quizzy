export type Badges = {
  id: string;
  title: string;
  value?: string;
  translate?: boolean;
  icon: string;
  locked: boolean;
  subtitle: string;
  lockedDate?: string;
};

export type AchievementSection = {
  header: string;
  components: AchievementHeader[];
};
export type AchievementHeader = {
  title: string;
  items: Badges[];
};

export const studyingBadges: Badges[] = [
  {
    id: "flashcard-whiz",
    title: "Flashcard whiz",
    subtitle: "locked 08/09/25",
    icon: "/achivements/locked-badge-StudiedWithFlashcards.svg",

    locked: true,
  },
  {
    id: "active-learner",
    title: "Active learner",
    subtitle: "locked 29/10/25",
    icon: "/achivements/locked-badge-StudiedWithLearn.svg",

    locked: true,
  },
  {
    id: "committed-learner",
    title: "Committed learner",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-ReachedEndOfLearn.svg",
  },
  {
    id: "match-whiz",
    title: "Match whiz",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-StudiedWithMatch.svg",
  },
  {
    id: "night-owl",
    title: "Night owl",
    subtitle: "locked 08/09/25",

    locked: false,
    icon: "/achivements/locked-badge-NightOwl.svg",
  },
  {
    id: "early-bird",
    title: "Early bird",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-EarlyBird.svg",
  },
  {
    id: "test-acer",
    title: "Test acer",
    subtitle: "locked 29/10/25",
    locked: false,
    icon: "/achivements/locked-badge-StudiedWithTest.svg",
  },
  {
    id: "set-builder",
    title: "Set builder",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-CreatedFirstSet.svg",
  },
  {
    id: "match-maker",
    title: "Match maker",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-StudiedWithMatch.svg",
  },
  {
    id: "exam-ready",
    title: "Exam ready",
    subtitle: "",
    locked: false,
    icon: "/achivements/locked-badge-CreatedFirstPracticeTest.svg",
  },
];

export const dailyStreaks: Badges[] = [
  {
    id: "3-day",
    value: "3",
    title: "3-day streak",
    locked: false,
    icon: "",

    subtitle: "",
  },
  {
    id: "5-day",
    value: "5",
    title: "5-day streak",
    locked: false,
    icon: "",

    subtitle: "",
  },
  {
    id: "7-day",
    value: "7",
    title: "7-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "10-day",
    value: "10",
    title: "10-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "20-day",
    value: "20",
    title: "20-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "30-day",
    value: "30",
    title: "30-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "45-day",
    value: "45",
    title: "45-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "60-day",
    value: "60",
    title: "60-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "70-day",
    value: "70",
    title: "70-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "80-day",
    value: "80",
    title: "80-day streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
];

export const weeklyStreaks: Badges[] = [
  {
    id: "3-week",
    value: "3",
    title: "3-week streak",
    locked: false,
    icon: "",

    subtitle: "",
  },
  {
    id: "5-week",
    value: "5",
    title: "5-week streak",
    locked: false,
    icon: "",

    subtitle: "",
  },
  {
    id: "10-week",
    value: "10",
    title: "10-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "20-week",
    value: "20",
    title: "20-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "30-week",
    value: "30",
    title: "30-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "40-week",
    value: "40",
    title: "40-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "52-week",
    value: "52",
    title: "52-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "60-week",
    value: "60",
    title: "60-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "70-week",
    value: "70",
    title: "70-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "80-week",
    value: "80",
    title: "80-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "90-week",
    value: "90",
    title: "90-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "104-week",
    value: "104",
    title: "104-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "125-week",
    value: "125",
    title: "125-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "156-week",
    value: "156",
    title: "156-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "175-week",
    value: "175",
    title: "175-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "204-week",
    value: "204",
    title: "204-week streak",
    icon: "",

    locked: true,
    subtitle: "",
  },
];

export const setsStudied: Badges[] = [
  {
    id: "set-1",
    value: "1",
    title: "Studied first set",
    lockedDate: "06/10/25",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-3",
    value: "3",
    title: "3 sets studied",
    lockedDate: "25/11/25",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-5",
    value: "5",
    title: "5 sets studied",
    lockedDate: "03/12/25",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-10",
    value: "10",
    title: "10 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-25",
    value: "25",
    title: "25 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-50",
    value: "50",
    title: "50 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-75",
    value: "75",
    title: "75 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-100",
    value: "100",
    title: "100 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-150",
    value: "150",
    title: "150 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-200",
    value: "200",
    title: "200 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-250",
    value: "250",
    title: "250 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-300",
    value: "300",
    title: "300 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-350",
    value: "350",
    title: "350 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-400",
    value: "400",
    title: "400 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-450",
    value: "450",
    title: "450 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-500",
    value: "500",
    title: "500 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-600",
    value: "600",
    title: "600 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-700",
    value: "700",
    title: "700 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-800",
    value: "800",
    title: "800 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-900",
    value: "900",
    title: "900 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-1000",
    value: "1k",
    title: "1,000 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-1500",
    value: "1.5k",
    title: "1,500 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-2000",
    value: "2k",
    title: "2,000 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-2500",
    value: "2.5k",
    title: "2,500 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-3000",
    value: "3k",
    title: "3,000 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-3500",
    value: "3.5k",
    title: "3,500 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-4000",
    value: "4k",
    title: "4,000 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-4500",
    value: "4.5k",
    title: "4,500 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "set-5000",
    value: "5k",
    title: "5,000 sets studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
];

export const roundsStudied: Badges[] = [
  {
    id: "round-1",
    value: "1",
    title: "Studied first round",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-3",
    value: "3",
    title: "3 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-5",
    value: "5",
    title: "5 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-10",
    value: "10",
    title: "10 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-25",
    value: "25",
    title: "25 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-50",
    value: "50",
    title: "50 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-75",
    value: "75",
    title: "75 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-100",
    value: "100",
    title: "100 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-150",
    value: "150",
    title: "150 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-200",
    value: "200",
    title: "200 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-250",
    value: "250",
    title: "250 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-300",
    value: "300",
    title: "300 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-350",
    value: "350",
    title: "350 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-400",
    value: "400",
    title: "400 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-450",
    value: "450",
    title: "450 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-500",
    value: "500",
    title: "500 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-600",
    value: "600",
    title: "600 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-700",
    value: "700",
    title: "700 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-800",
    value: "800",
    title: "800 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-900",
    value: "900",
    title: "900 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-1000",
    value: "1k",
    title: "1,000 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-1500",
    value: "1.5k",
    title: "1,500 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-2000",
    value: "2k",
    title: "2,000 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-2500",
    value: "2.5k",
    title: "2,500 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-3000",
    value: "3k",
    title: "3,000 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-3500",
    value: "3.5k",
    title: "3,500 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-4000",
    value: "4k",
    title: "4,000 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-4500",
    value: "4.5k",
    title: "4,500 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "round-5000",
    value: "5k",
    title: "5,000 rounds studied",
    icon: "",

    locked: true,
    subtitle: "",
  },
];

export const studyGuides: Badges[] = [
  {
    id: "guide-1",
    value: "1",
    title: "Created first study guide",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-3",
    value: "3",
    title: "3 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-5",
    value: "5",
    title: "5 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-10",
    value: "10",
    title: "10 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-25",
    value: "25",
    title: "25 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-50",
    value: "50",
    title: "50 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-75",
    value: "75",
    title: "75 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-100",
    value: "100",
    title: "100 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-150",
    value: "150",
    title: "150 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-200",
    value: "200",
    title: "200 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-250",
    value: "250",
    title: "250 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-300",
    value: "300",
    title: "300 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-350",
    value: "350",
    title: "350 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-400",
    value: "400",
    title: "400 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-450",
    value: "450",
    title: "450 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-500",
    value: "500",
    title: "500 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-600",
    value: "600",
    title: "600 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-700",
    value: "700",
    title: "700 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-800",
    value: "800",
    title: "800 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-900",
    value: "900",
    title: "900 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
  {
    id: "guide-1000",
    value: "1k",
    title: "1,000 study guides created",
    icon: "",

    locked: true,
    subtitle: "",
  },
];

export const allSteakSections: AchievementSection[] = [
  {
    header: "Streaks",
    components: [
      {
        title: "Daily streaks",
        items: dailyStreaks.map((badge) => ({
          ...badge,
          icon: "/achivements/locked-badge-Day.svg",
        })),
      },
      {
        title: "Weekly streaks",
        items: weeklyStreaks.map((badge) => ({
          ...badge,
          icon: "/achivements/locked-badge-Week.svg",
        })),
      },
    ],
  },

  {
    header: "Lifetime",
    components: [
      {
        title: "Sets studied",
        items: setsStudied.map((badge) => ({
          ...badge,
          icon: "/achivements/locked-badge-SetsStudied.svg",
          translate: true,
        })),
      },
      {
        title: "Rounds studied",
        items: roundsStudied.map((badge) => ({
          ...badge,
          icon: "/achivements/locked-badge-RoundsStudied.svg",
        })),
      },
      {
        title: "Study guides created",
        items: studyGuides.map((badge) => ({
          ...badge,
          icon: "/achivements/locked-badge-StudyGuidesCreated.svg",
        })),
      },
    ],
  },
];
