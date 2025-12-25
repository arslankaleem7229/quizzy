import React, { ReactNode } from "react";
import styles from "../styles/Card.module.css";

interface AchievementSectionCardProps {
  title: string;
  children: ReactNode;
}

export function AchievementSectionCard({
  title,
  children,
}: AchievementSectionCardProps) {
  return (
    <section className="space-y-5 md:pt-8 pt-4">
      <div>
        <h2 className="text-xl">{title}</h2>{" "}
      </div>
      <div className={styles.card}>{children}</div>
    </section>
  );
}
