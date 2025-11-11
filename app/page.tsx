import Image from "next/image";
import HomePosters from "./home/HomePosters";
import FlashCardsComponent from "./home/FlashCards";

export default function Home() {
  return (
    <main className="flex-1 w-full overflow-x-hidden bg-white space-y-10 pb-16">
      <section className="bg-gray-100 w-full">
        <div className="max-w-6xl lg:max-w-7xl mx-auto flex flex-col items-center gap-10 px-8 md:px-16 py-12">
          <div className="max-w-3xl flex flex-col gap-4 text-center">
            <h1 className="text-[2.7rem] font-bold tracking-normal leading-tight">
              How do you want to study?
            </h1>
            <p className="text-base md:text-xl font-light tracking-wide leading-relaxed">
              Master whatever you&apos;re learning with Quizzy&apos;s
              interactive flashcards, practice tests and study activities.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary justify-center py-4 px-6">
                Sign up for free
              </button>
            </div>
          </div>
          <FlashCardsComponent />
        </div>
      </section>
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
        <button className="btn-primary w-35 p-5">Get Started</button>
      </HomePosters>
    </main>
  );
}
