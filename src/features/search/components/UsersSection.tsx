import Image from "next/image";
import React from "react";
import { userResults } from "../data/flashcardsdata";

const UsersSection = () => {
  return (
    <section className="space-y-5 text-(--textColor)">
      <header className="flex items-center justify-between">
        <div>
          <h1>Users</h1>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {userResults.map((user, index) => (
          <article
            key={user.id}
            className="flex flex-col items-start gap-4 rounded-lg border-(--grayText)/10 border-2 bg-(--cardColor) p-5"
          >
            <div
              className={`flex h-16 w-16 flex-none items-center justify-center relative overflow-clip rounded-full`}
            >
              <Image
                src={`/avatars/${(index + 1) % 20}.jpg`}
                alt={user.name}
                fill
                className="object-contain"
              />
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-semibold">{user.name}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs ">
                <span className="rounded-full bg-(--capsule) px-3 py-1">
                  {user.flashcards} flashcard sets
                </span>
                <span className="rounded-full bg-(--capsule) px-3 py-1">
                  {user.classes} classes
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UsersSection;
