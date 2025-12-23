import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTheme } from "next-themes";
import {
  HiOutlineBars3,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";

export type FlashcardCard = {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  explanation?: string;
};

interface SortableCardProps {
  card: FlashcardCard;
  index: number;
  removeCard: (id: string) => void;
  onChange: (id: string, updates: Partial<FlashcardCard>) => void;
  disabled?: boolean;
}

export default function SortableCard({
  card,
  index,
  removeCard,
  onChange,
  disabled = false,
}: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { theme, systemTheme } = useTheme();

  const current = theme === "system" ? systemTheme : theme;

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`rounded-2xl 
        ${current === "light" ? "bg-(--background)" : "bg-(--cardColor)"}
        px-6 ${
          current === "light" && "drop-shadow-[0_0px_10px_rgba(0,0,0,0.1)]"
        }`}
    >
      <div
        className="flex justify-between py-4 cursor-grab active:cursor-grabbing"
        {...listeners}
      >
        <div className="font-medium self-center ">{index + 1}</div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-5 w-5"
            aria-label="Reorder card"
          >
            <HiOutlineBars3 className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-5 w-5"
            onClick={() => removeCard(card.id)}
            aria-label="Remove card"
            disabled={disabled}
          >
            <HiOutlineTrash className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 py-3 ">
        <div className="flex-1">
          <input
            placeholder="Enter term"
            value={card.term}
            onChange={(event) =>
              onChange(card.id, { term: event.target.value })
            }
            disabled={disabled}
            className={`w-full rounded-lg border border-transparent 
        ${
          current === "light" ? "bg-(--cardColor)" : "bg-(--background)"
        }  px-4 py-3 text-base focus:outline-none focus:ring-[#a8b1ff] focus:ring-1`}
          />
          <p className="mt-2 text-xs font-extralight">TERM</p>
        </div>

        <div className="flex flex-1 flex-row sm:flex-2 gap-4 ">
          <div className="flex-1">
            <input
              placeholder="Enter definition"
              value={card.definition}
              onChange={(event) =>
                onChange(card.id, { definition: event.target.value })
              }
              disabled={disabled}
              className={`w-full rounded-lg border border-transparent 
        ${
          current === "light" ? "bg-(--cardColor)" : "bg-(--background)"
        } px-4 py-3 text-base focus:ring-[#a8b1ff] focus:outline-none focus:ring-1`}
            />
            <p className="mt-2 text-xs font-extralight">DEFINITION</p>
          </div>

          <div className="w-21 shrink-0">
            <div className="flex h-15 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-(--foreground) text-center text-sm">
              <HiOutlinePhoto className="h-6 w-6" />
              <span className="text-xs">Image</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
