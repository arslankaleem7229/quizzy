import Link from "next/link";
import { studyModes } from "../data/studymodes";

export default function ModesButton({ id }: { id: string }) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {studyModes.map((mode) => (
        <Link
          href={`${mode.ref}${id}`}
          key={mode.id}
          aria-disabled={!mode.enabled}
          className={`rounded-lg bg-(--cardColor) p-5 font-medium
                tracking-wide transition border-b-2 border-transparent 
                text-center
                ${
                  !mode.enabled
                    ? "pointer-events-none hover:border-b-0 bg-gray-700"
                    : "hover:border-(--primary)"
                }`}
        >
          {mode.label}
        </Link>
      ))}
    </div>
  );
}
