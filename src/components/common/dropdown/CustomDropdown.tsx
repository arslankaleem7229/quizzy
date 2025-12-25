import { ReactNode, useEffect, useRef, useState } from "react";

type CustomDropdownProps = {
  trigger: (props: {
    ref: React.RefObject<HTMLButtonElement | null>;
    onClick: () => void;
    isOpen: boolean;
  }) => ReactNode;
  children: (props: { close: () => void }) => ReactNode;
  align?: "left" | "right";
};

export const CustomDropdown = ({
  trigger,
  children,
  align = "right",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative">
      {trigger({
        ref: triggerRef,
        onClick: toggle,
        isOpen,
      })}

      {isOpen ? (
        <div
          ref={dropdownRef}
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-3 z-50`}
        >
          {children({ close })}
        </div>
      ) : null}
    </div>
  );
};
