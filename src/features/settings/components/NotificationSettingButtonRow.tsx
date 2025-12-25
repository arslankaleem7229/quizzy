import { HiOutlineEnvelope } from "react-icons/hi2";

const NotificationSettingButtonRow = ({
  label,
  value,
  isLoading,
  onClick,
}: {
  label: string;
  value: boolean;
  isLoading: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`flex flex-row gap-2 border-t-2 last:border-none first:border-t-0 border-b-2 border-gray-700 pl-6 pr-10 py-6 items-center justify-between`}
    >
      <p className="font-medium">{label}</p>

      <button
        type="button"
        disabled={isLoading}
        onClick={onClick}
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          value ? "bg-(--primary)" : "bg-(--foreground)/10"
        } text-(--foreground) transition`}
      >
        <HiOutlineEnvelope className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationSettingButtonRow;
