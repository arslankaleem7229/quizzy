import { flashcards } from "@/app/data/flashcards";
import Image from "next/image";
import HomePosters from "./home/HomePosters";

export default function Home() {
  return (
    <main className=" h-screen flex-1 overflow-auto">
      <div className="bg-gray-100 h-full max-h-full w-full">
        <div className="h-[calc(50%)] sm:h-[calc(45%)] p-8 md:p-16 flex justify-center ">
          <div className="h-full max-w-3xl flex gap-0 md:gap-5 flex-col items-center justify-around">
            <h1 className="flex text-[2.7rem] items-center text-center font-bold justify-center tracking-normal leading-tight">
              How do you want to study?
            </h1>
            <p className="flex text-base md:text-xl font-light justify-center items-center text-center tracking-wide leading-relaxed">
              Master whatever you&apos;re learning with Quizzy&apos;s
              interactive flashcards, practice tests and study activities.
            </p>
            <button className="btn-primary justify-center py-4 px-6">
              Sign up for free
            </button>
          </div>
        </div>
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
      </div>
      <HomePosters
        title={"Every class, every test, one ultimate study app "}
        description={
          " Create your own flashcards or find sets made by teachers, students and experts. Study them anytime, anywhere with our free app."
        }
        image={"/mockups/all-in-one.avif"}
        isreversed
      >
        <>
          <Image
            src="/mockups/google-play.png"
            alt="GooglePlay download button"
            width={10000}
            height={100000}
            className="w-30 h-10"
          />
          <Image
            src="/mockups/google-play.png"
            alt="GooglePlay download button"
            width={10000}
            height={100000}
            className="w-30 h-10"
          />
        </>
      </HomePosters>

      <HomePosters
        title={"Make studying class material quick and easy"}
        description={
          "Turn your slides, videos and notes into flashcard sets, practice tests and study guides."
        }
        image={"/mockups/study-material.avif"}
        isreversed={false}
      >
        <button className="btn-primary w-35 p-5">Try it out</button>
      </HomePosters>

      <HomePosters
        title={"Prepare for tests on any subject"}
        description={
          "Memorise anything with personalised practice tests and revision sessions in Learn. 98% of students say Quizlet has improved their comprehension."
        }
        image={"/mockups/prepration.avif"}
        isreversed
      >
        <button className="btn-primary w-35 p-5">Try it out</button>
      </HomePosters>
    </main>
  );
}
