import { recents } from "../temp_data";

const RecentComponent = () => {
  return (
    <div>
      <div className="px-1 md:px-3 py-3 text-md font-base text-(--foreground)/80">
        Recents
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recents.map((item) => (
          <div
            key={item.title}
            className={`rounded-lg hover:bg-(--latest-card) px-3 py-2 transition duration-0`}
          >
            <div className="flex flex-row items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-(--latest-card) text-lg text-white/80`}
              >
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`h-6 w-6 text-(--latest-image)/50`}
                >
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 9h8M8 13h5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col justify-center items-start h-full">
                <div className="text-sm">{item.title}</div>
                <p className="text-sm font-light">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentComponent;
