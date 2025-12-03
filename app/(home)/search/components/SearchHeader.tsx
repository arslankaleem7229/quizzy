import React from "react";

const tabs = [
  "All results",
  "Flashcard sets",
  "Practice tests",
  "Study guides",
  "Textbooks",
  "Questions",
  "Users",
  "Classes",
];

const SearchHeader = () => {
  const query = "sajnasd";
  return (
    <div className="space-y-4">
      <p className="text-lg text-(--grayText)">
        Results for{" "}
        <span className="font-semibold text-(--forground)">
          &quot;{query}&quot;
        </span>
      </p>
      <div className="flex justify-between text-sm border-(--grayText) border-b-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`border-b-2 px-5 py-2 transition relative -bottom-0.5 ${
              tab === "All results"
                ? "border-(--primary) text-(--primary)"
                : "border-transparent hover:text-(--primary) hover:border-current text-(--textColor)"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;
