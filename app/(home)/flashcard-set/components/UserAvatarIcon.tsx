const UserAvatarIcon = ({ classname }: { classname: string }) => {
  return (
    <div className={`${classname}  md:flex-wrap items-center gap-1 md:gap-3`}>
      <div className="flex h-5 w-5 text-sm lg:h-12 lg:w-12 lg:text-xl items-center justify-center rounded-full bg-teal-600  font-semibold text-white">
        J
      </div>
      <div>
        <p className="text-sm font-light lg:text-base lg:font-medium text-white">
          Jose_Rangel302
        </p>
        <p className="hidden lg:flex text-xs font-extralight">
          Created 4 years ago
        </p>
      </div>
    </div>
  );
};

export default UserAvatarIcon;
