import Image from "next/image";

const benefits = [
  {
    title: "Ace your exams with real practice tests",
    description:
      "Erase exam anxiety with practice questions tailored to your subjects.",
    accent: "bg-[#FFCC80]",
  },
  {
    title: "Instantly generate flashcards, study guides and more",
    description:
      "Save hours of study time with effortless creation and organisation.",
    accent: "bg-[#F8E6FF]",
  },
  {
    title: "Practise with multiple choice questions in Learn",
    description: "Get complete access to personalised study modes.",
    accent: "bg-[#FFE163]",
  },
  {
    title: "Get step-by-step homework help with Expert Solutions",
    description:
      "Crush tough homework with expert-written solutions ready when you need them.",
    accent: "bg-[#A2F5CD]",
  },
];

const PaymentPoster = () => {
  return (
    <div className="w-full bg-(--background)">
      {benefits.map((benefit, index) => {
        const isreversed = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex ${
              isreversed ? "lg:flex-row-reverse" : "lg:flex-row"
            } flex-col max-w-6xl lg:max-w-8xl lg:px-16 md:px-6 mx-auto max-h-[520px] lg:min-h-0 py-5 lg:py-10`}
          >
            <div className="relative rounded-2xl w-full h-[25vh] md:h-[70vh] lg:h-full lg:basis-1/2 lg:min-h-[360px] overflow-hidden">
              <Image
                src={`/gifs/${index + 1}.gif`}
                alt={`${index}.gif`}
                fill
                className="object-cover"
              />
            </div>
            <div
              className={`flex flex-col w-full  lg:h-full lg:basis-1/2 gap-5 pt-7 lg:pt-0 py-4 justify-center text-start ${
                isreversed ? "lg:pr-10 xl:pr-16" : "lg:pl-10 xl:pl-16"
              } `}
            >
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-semibold tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-base md:text-xl lg:text-2xl font-light">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentPoster;
