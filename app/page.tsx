import Image from "next/image";
import HomePosters from "./home/HomePosters";
import FlashCardsComponent from "./home/FlashCards";

export default function Home() {
  return (
    <main className=" h-screen flex-1 overflow-auto ">
      <div className="bg-gray-100 md:h-full h-[calc(100%-100px)] w-full">
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
        <FlashCardsComponent />
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
