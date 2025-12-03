import React from "react";
import { FaUsers } from "react-icons/fa";

const userResults = [
  {
    id: "user-1",
    name: "sajnasd",
    flashcards: 0,
    classes: 0,
    color: "#6EE7B7",
  },
  {
    id: "user-2",
    name: "sakjnasd",
    flashcards: 0,
    classes: 0,
    color: "#F472B6",
  },
];

const ClassesSection = () => {
  return (
    <section className="space-y-5 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h1>Classes</h1>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-(--primary)">
          View all
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {userResults.map((user) => (
          <article
            key={user.id}
            className="flex flex-row min-h-[150px] gap-4 rounded-lg border-2 bg-white/10 border-gray-700 p-5"
          >
            <div className="flex flex-1 flex-col justify-between">
              <p className="text-lg flex font-semibold">{user.name}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-white">
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {user.flashcards} flashcard sets
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {user.classes} classes
                </span>
              </div>
            </div>

            <FaUsers className={`h-14 w-14 text-cyan-300`} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default ClassesSection;
