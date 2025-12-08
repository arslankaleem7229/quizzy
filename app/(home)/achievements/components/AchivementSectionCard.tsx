import React, { ReactNode } from "react";
import styles from "./../style/Card.module.css";

const AchivementSectionCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className="space-y-5 md:pt-8 pt-4 ">
      <div>
        <h2 className="text-xl">{title}</h2>
      </div>

      <div className={`${styles.card}`}>{children}</div>
    </section>
  );
};

export default AchivementSectionCard;
