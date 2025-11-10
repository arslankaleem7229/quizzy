export default function Home() {
  return (
    <main className="flex-1 gr overflow-auto">
      <div className="bg-gray-200 w-full h-[calc(100%-28x)] md:h-[calc(100%-16px)]">
        <div className="h-1/2 px-8 sm:px-16 md:px-24 py-16">
          <div className="h-full flex flex-col items-center justify-around">
            <h1 className="flex text-[2.7rem] items-center text-center font-bold justify-center tracking-normal leading-tight">
              How do you want to study?
            </h1>
            <p className="flex text-xl font-light justify-center items-center text-center tracking-wide leading-relaxed">
              Master whatever you&apos;re learning with Quizzy&apos;s
              interactive flashcards, practice tests and study activities.
            </p>
            <button className="btn-primary justify-center py-4 px-6">
              Sign up for free
            </button>
          </div>
        </div>
        <div className="h-1/2">
          <Card />
        </div>
      </div>
    </main>
  );
}

function Card() {
  return <div></div>;
}
