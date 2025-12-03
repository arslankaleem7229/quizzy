import { folders, primaryNav, quickLinks } from "../temp_data";

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r border-(--foreground)/5 bg-(--background) px-3 py-10 lg:flex">
      <nav className="text-sm">
        {primaryNav.map((item) => (
          <SidebarButton key={item.label} item={item} />
        ))}
      </nav>

      <SidebarDivider />

      <div className="mt-6 text-sm font-medium tracking-wide text-(--foreground)/50">
        Your folders
      </div>
      <div className="mt-3 space-y-2 text-sm">
        {folders.map((item) => (
          <SidebarButton key={item.label} item={item} />
        ))}
      </div>

      <SidebarDivider />

      <div className="mt-6 text-sm font-medium tracking-wide text-(--foreground)/50">
        Start here
      </div>
      <div className="mt-3 space-y-2 text-sm">
        {quickLinks.map((link) => (
          <SidebarButton key={link.label} item={link} />
        ))}
      </div>
    </aside>
  );
};

const SidebarDivider = () => <div className="mt-8 h-px bg-(--foreground)/10" />;

const SidebarButton = ({
  item,
}: {
  item: {
    label: string;
    icon: string;
    active?: boolean;
  };
}) => {
  return (
    <button
      key={item.label}
      className={`flex w-full items-center gap-5 rounded-lg px-3 py-3 text-left transition ${
        item.active
          ? "bg-white/10 font-medium"
          : "text-(--textColor) hover:bg-(--foreground)/5"
      }`}
    >
      <div
        className={`
                relative h-4 w-4
                before:content-[''] before:absolute before:inset-0 before:bg-(--iconColor)
                before:[-webkit-mask-image:var(--icon)]
                before:mask-(--icon)
                before:mask-contain
                before:mask-no-repeat
                before:mask-center
              `}
        style={{
          // TS friendly way to set a CSS var
          ["--icon" as never]: `url(${item.icon})`,
        }}
      />
      {item.label}
    </button>
  );
};

export default Sidebar;
