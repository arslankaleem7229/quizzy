import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { UserAvatarIconProps } from "../types";

dayjs.extend(relativeTime);

export function UserAvatarIcon({
  classname,
  user,
  createdAt,
}: UserAvatarIconProps) {
  return (
    <div className={`${classname}  md:flex-wrap items-center gap-1 md:gap-3`}>
      {!user.image ? (
        <div className="flex h-5 w-5 text-sm lg:h-12 lg:w-12 lg:text-xl items-center justify-center rounded-full bg-teal-600  font-semibold text-(--textColor)">
          {user.name?.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className="relative h-5 w-5 lg:h-12 lg:w-12 items-center justify-center rounded-full overflow-hidden">
          <Image
            src={user.image}
            alt={"creator image"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <p className="text-sm font-light lg:text-base lg:font-medium ">
          {user.username}
        </p>
        <p className="hidden lg:flex text-xs font-extralight">
          Created {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
