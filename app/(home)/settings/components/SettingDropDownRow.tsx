"use client";
import { CustomDropdown } from "@/app/components/dropdown/CustomDropdown";
import { HiOutlineChevronDown } from "react-icons/hi2";

type SettingDropDownProps = {
  label: string;
  value: string;
  options: string[];
  isLoading?: boolean;
  onClick?: (option: string) => void;
};

const SettingDropDownRow = ({
  label,
  value,
  options,
  onClick,
  isLoading,
}: SettingDropDownProps) => {
  return (
    <div className="flex flex-row gap-2 last:border-none border-b-2 border-gray-700 pl-6 pr-10 py-6 items-center justify-between ">
      <div>
        <p className="font-medium"> {label} </p>
      </div>

      <CustomDropdown
        trigger={({ ref, onClick, isOpen }) => (
          <button
            disabled={isLoading}
            ref={ref}
            onClick={onClick}
            className="inline-flex gap-2 items-center rounded-full bg-(--capsule) px-6 text-sm font-semibold transition outline-none py-3.5 appearance-none"
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            {value}
            <HiOutlineChevronDown className="h-4 w-4" />
          </button>
        )}
      >
        {({ close }) => (
          <div className="w-40 -translate-y-2 translate-x-1/6 rounded-2xl border border-(--foreground)/20 bg-(--background) shadow-2xl overflow-hidden">
            <nav className="flex flex-col text-sm py-2">
              {options?.map((option) => {
                return (
                  <button
                    disabled={isLoading}
                    key={option}
                    onClick={() => {
                      onClick?.(option);
                      close();
                    }}
                    type="button"
                    className="w-full flex items-left px-4 py-2 text-left text-(--textColor) hover:bg-(--foreground)/10 transition-colors"
                  >
                    <span className="font-medium tracking-wide">{option}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </CustomDropdown>
    </div>
  );
};

export default SettingDropDownRow;
