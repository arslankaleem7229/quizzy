import { ChangeEventHandler, ReactNode } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

const SettingDropDownRow = ({
  label,
  value,
  actionLabel,
  onAction,
  children,
}: {
  label: string;
  value: string;
  actionLabel?: string;
  onAction?: ChangeEventHandler<HTMLSelectElement>;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-2 last:border-none border-b-2 border-gray-700 pl-6 pr-10 py-6 items-center justify-between ">
      <div>
        <p className="font-medium"> {label} </p>
      </div>
      <div className="inline-flex gap-2 items-center rounded-full bg-(--capsule) pr-6 text-sm font-semibold transition">
        <select
          value={value}
          name={actionLabel}
          onChange={onAction}
          // TODO: Fix this
          className="w-full bg-transparent outline-none pl-6 py-3.5 appearance-none"
        >
          {children}
          {/* {actionLabel} */}
        </select>
        <HiOutlineChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default SettingDropDownRow;
