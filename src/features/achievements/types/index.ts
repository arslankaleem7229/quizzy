export interface Badge {
  id: string;
  title: string;
  value?: string;
  translate?: boolean;
  icon: string;
  locked: boolean;
  subtitle: string;
  lockedDate?: string;
}

export interface AchievementCategory {
  title: string;
  items: Badge[];
}

export interface AchievementSection {
  header: string;
  components: AchievementCategory[];
}

export interface CurrentStreak {
  weekCount: number;
  daysInWeek: number;
}

export interface RecentlyEarned {
  badgeType: string;
  count: number;
}

export interface AchievementsData {
  studyingBadges: Badge[];
  streakSections: AchievementSection[];
  recentlyEarned: RecentlyEarned;
  currentStreak: CurrentStreak;
}
