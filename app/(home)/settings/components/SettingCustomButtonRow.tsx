import { ReactNode } from "react";

const SettingCustomButtonRow = ({
  label,
  desc,
  enableTopBorder = false,
  enableBottomBorder = true,
  children,
}: {
  label: string;
  desc: string;
  enableTopBorder?: boolean;
  enableBottomBorder?: boolean;

  children?: ReactNode;
}) => {
  return (
    <div
      className={`flex flex-row gap-2 ${enableTopBorder && "border-t-2 "} ${
        enableBottomBorder && "border-b-2"
      } border-gray-700 pl-6 pr-10 py-6 items-center justify-between `}
    >
      <div>
        <p className="font-medium"> {label} </p>
        <p className="text-sm font-light tracking-wide">{desc}</p>
      </div>
      <div className="inline-flex gap-2 items-center rounded-full bg-(--capsule) text-sm font-semibold transition text-white">
        {children}
      </div>
    </div>
  );
};

export default SettingCustomButtonRow;
