"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NavItem = {
  label: string;
  icon: string;
  href: string;
};

export const primaryNav = [
  { label: "Home", icon: "/sidebar-icons/home.png", href: "/latest" },
  {
    label: "Your library",
    icon: "/sidebar-icons/folder.png",
    href: "/library",
  },
  { label: "Notifications", icon: "/sidebar-icons/bell.png", href: "#" },
];

export const folders = [
  {
    label: "New folder",
    icon: "/sidebar-icons/plus.png",
    href: "/create-flashcards",
  },
];

export const quickLinks = [
  {
    label: "Flashcards",
    icon: "/sidebar-icons/flash-cards.png",
    href: "/library?filter=flashcards",
  },
  {
    label: "Study Guides",
    icon: "/sidebar-icons/study-guides.png",
    href: "/library?filter=studyguides",
  },
  {
    label: "Practice Tests",
    icon: "/sidebar-icons/checklist.png",
    href: "/library?filter=practicetests",
  },
  {
    label: "Expert solutions",
    icon: "/sidebar-icons/book.png",
    href: "/library?filter=expertsolutions",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathWithQuery = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const isActive = (href: string) => {
    if (href === "#") return false;
    return href.includes("?") ? pathWithQuery === href : pathname === href;
  };

  return (
    <aside className="relative hidden h-full lg:flex w-20 2xl:min-w-64 flex-col border-r border-(--foreground)/5 bg-(--background) px-3 transition-[width] duration-300 ease-out">
      <div className="sticky top-28 md:top-20 flex w-full flex-col scroll-none">
        <nav className="text-sm">
          {primaryNav.map((item) => (
            <SidebarButton
              key={item.label}
              item={item}
              active={isActive(item.href)}
            />
          ))}
        </nav>
        <SidebarDivider />
        <div className="2xl:mt-6 hidden 2xl:flex text-sm font-medium tracking-wide text-(--textColor)/50">
          Your folders
        </div>
        <div className="mt-8 2xl:mt-3 space-y-2 text-sm flex">
          {folders.map((item) => (
            <SidebarButton
              key={item.label}
              item={item}
              active={isActive(item.href)}
            />
          ))}
        </div>
        <SidebarDivider />
        <div className="2xl:mt-6 hidden 2xl:flex text-sm font-medium tracking-wide text-(--textColor)/50">
          Start here
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {quickLinks.map((link) => (
            <SidebarButton
              key={link.label}
              item={link}
              active={isActive(link.href)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

const SidebarDivider = () => <div className="mt-8 h-px bg-(--foreground)/10" />;

const SidebarButton = ({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) => {
  return (
    <Link
      href={item.href}
      key={item.label}
      className={`flex w-full items-center 2xl:gap-5 rounded-lg 2xl:px-3 py-3 justify-center 2xl:justify-start text-left transition ${
        active
          ? "bg-white/10 font-medium"
          : "text-(--textColor) hover:bg-(--foreground)/5"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <div
        className={`
                relative h-5 w-5 2xl:h-4 2xl:w-4
                before:content-[''] before:absolute before:inset-0 before:bg-(--iconColor)
                before:[-webkit-mask-image:var(--icon)]
                before:mask-(--icon)
                before:mask-contain
                before:mask-no-repeat
                before:mask-center
              `}
        style={{
          ["--icon" as never]: `url(${item.icon})`,
        }}
      />
      <div className="hidden 2xl:flex">{item.label}</div>
    </Link>
  );
};
