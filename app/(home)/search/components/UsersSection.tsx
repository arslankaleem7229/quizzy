import Image from "next/image";
import React from "react";

const userResults = [
  {
    id: "user-1",
    name: "sajnasd",
    flashcards: 0,
    classes: 0,
    color: "from-[#6EE7B7] to-[#3B82F6]",
  },
  {
    id: "user-2",
    name: "sakjnasd",
    flashcards: 0,
    classes: 0,
    color: "from-[#F472B6] to-[#C084FC]",
  },
];

const UsersSection = () => {
  return (
    <section className="space-y-5">
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
            className="flex flex-col items-start gap-4 rounded-lg border-2 bg-white/10 border-gray-700 p-5"
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
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-white">
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {user.flashcards} flashcard sets
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">
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
