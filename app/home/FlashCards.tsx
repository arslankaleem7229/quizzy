import Image from "next/image";
import { flashcards } from "@/app/data/flashcards";

const FlashCardsComponent = () => {
  return (
    <div className="h-[calc(50%)] sm:h-[calc(55%)] w-full">
      <div className="w-full h-full flex justify-center overflow-hidden">
        <div className="flex h-[calc(85%)] space-x-8 py-8 px-8">
          {flashcards.map((flashcard, i) => {
            return (
              <div
                key={i}
                className={`relative shrink-0 w-60 h-80 md:w-75 md:h-full ${flashcard.color} rounded-xl overflow-hidden shadow p-4 transform transition ease-in-out duration-500 hover:scale-110`}
              >
                <h3
                  className={`font-bold text-xl text-center ${
                    flashcard.title === "Flashcards"
                      ? "text-white"
                      : "text-black"
                  } `}
                >
                  {flashcard.title}
                </h3>
                <Image
                  width={1000}
                  height={1000}
                  src={`${flashcard.image}`}
                  className="absolute flex h-[calc(90%)] w-full bottom-0 right-0"
                  alt={flashcard.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashCardsComponent;
