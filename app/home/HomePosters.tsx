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
    <div className="w-full md:h-1/2 h-[calc(100%-100px)] bg-white">
      <div
        className={`flex ${
          isreversed ? "md:flex-row-reverse" : "md:flex-row"
        }  flex-col h-full justify-center max-w-6xl p-8 mx-auto`}
      >
        <div className="flex-10 md:flex-1 relative h-full">
          <Image src={image} alt="all-in-one" fill className="object-contain" />
        </div>
        <div
          className={`flex flex-6 md:flex-1 flex-col justify-between py-8 ${
            isreversed ? "md:pr-16" : "md:pl-16"
          } `}
        >
          <h3 className=" text-3xl font-bold tracking-wide">{title}</h3>
          <p>{description}</p>
          <div className="flex gap-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePosters;
