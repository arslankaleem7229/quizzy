import Image from "next/image";
import { ReactNode } from "react";

interface HomePostersProps {
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
  isreversed: boolean;
}

const HomePosters = ({
  title,
  description,
  image,
  isreversed,
  children,
}: HomePostersProps) => {
  return (
    <section className="w-full bg-white">
      <div
        className={`flex ${
          isreversed ? "md:flex-row-reverse" : "md:flex-row"
        } flex-col max-w-6xl md:px-16 px-6 md:py-0 mx-auto min-h-[640px] md:min-h-0`}
      >
        <div className="relative w-full flex-1 md:basis-1/2 md:min-h-[360px]">
          <Image src={image} alt="all-in-one" fill className="object-contain" />
        </div>
        <div
          className={`flex flex-col w-full md:basis-1/2 py-6 md:p-0 justify-center gap-5 text-start ${
            isreversed ? "md:pr-16" : "md:pl-16"
          } `}
        >
          <h3 className="text-3xl font-bold tracking-wide">{title}</h3>
          <p className="text-base md:text-lg text-gray-700">{description}</p>
          <div className="flex gap-3 flex-wrap justify-center md:justify-start">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePosters;
