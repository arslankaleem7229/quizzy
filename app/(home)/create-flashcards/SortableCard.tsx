import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  HiOutlineBars3,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";

interface SortableCardProps {
  card: { id: string };
  index: number;
  removeCard: (id: string) => void;
}

export default function SortableCard({
  card,
  index,
  removeCard,
}: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="rounded-2xl bg-[#2E3856] px-6 text-white"
    >
      <div
        className="flex justify-between py-4 cursor-grab active:cursor-grabbing"
        {...listeners}
      >
        <div className="font-medium self-center text-white">{index + 1}</div>

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
          >
            <HiOutlineTrash className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 py-3 ">
        <div className="flex-1">
          <input
            placeholder="Enter term"
            className="w-full rounded-lg border border-transparent bg-(--background) px-4 py-3 text-base text-white placeholder:text-white focus:outline-none focus:ring-1"
          />
          <p className="mt-2 text-xs font-extralight">TERM</p>
        </div>

        <div className="flex flex-1 flex-row sm:flex-2 gap-4 ">
          <div className="flex-1">
            <input
              placeholder="Enter definition"
              className="w-full rounded-lg border border-transparent bg-(--background) px-4 py-3 text-base text-white placeholder:text-white focus:outline-none focus:ring-1"
            />
            <p className="mt-2 text-xs font-extralight">DEFINITION</p>
          </div>

          <div className="w-21 shrink-0">
            <div className="flex h-15 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-white text-center text-sm">
              <HiOutlinePhoto className="h-6 w-6" />
              <span className="text-xs">Image</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
