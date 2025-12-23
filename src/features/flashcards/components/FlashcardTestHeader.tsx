import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { CiBookmark } from "react-icons/ci";
import { IoShareOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import UserAvatarIcon from "./UserAvatarIcon";
import { QuizWithLocalization } from "@/lib/types/api";

const FlashcardTestHeader = ({ quiz }: { quiz: QuizWithLocalization }) => {
  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center">
        <h1 className="text-3xl font-semibold">
          {quiz.localizations[0].title}
        </h1>
      </div>
      <div className="flex flex-row items-center justify-between md:justify-start md:gap-5 text-sm">
        <span>13 studiers today</span>
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <span>4.5 ({quiz.reviews.length} reviews)</span>

        <UserAvatarIcon
          user={quiz.createdBy}
          createdAt={quiz.createdAt}
          classname="flex flex-row lg:hidden"
        />
      </div>
      <FlashCardTestHeaderButtonRow classname="flex justify-start lg:hidden" />
    </header>
  );
};

export const FlashCardTestHeaderButtonRow = ({
  classname,
}: {
  classname: string;
}) => {
  return (
    <div className={`${classname} items-center gap-2 text-sm`}>
      <button className="flex gap-2 justify-center items-center rounded-full bg-(--capsule) px-4 py-2.5">
        <CiBookmark className="h-4 w-4" />
        Save
      </button>
      <button className="flex gap-2 justify-center items-center rounded-full bg-(--capsule) px-4 py-2.5">
        <MdGroups className="h-4 w-4" />
        Groups
      </button>
      <button className="rounded-full bg-(--capsule) p-2.5">
        <IoShareOutline className="h-5 w-5" />
      </button>
      <button className="rounded-full bg-(--capsule) p-2.5">
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default FlashcardTestHeader;
