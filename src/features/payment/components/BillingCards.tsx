import { FaCheck } from "react-icons/fa";
import { plans } from "../data/plans";

export default function BillingCards() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 justify-center">
      {plans.map((plan) => (
        <article
          key={plan.id}
          className="rounded-lg bg-(--foreground)/10 p-6 text-left max-w-md"
        >
          <div>
            <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
            <p className="flex items-center justify-between text-md font-extralight">
              {plan.subtitle}
            </p>
          </div>
          <div className="mt-6 flex items-baseline gap-2 text-5xl font-bold">
            {plan.price}
            <span className="text-base font-semibold text-(--grayText)">
              / month
            </span>
          </div>
          <p className="mt-3 text-base font-medium tracking-wide">
            {plan.billing}
          </p>
          <button className="mt-6 w-full rounded-full bg-[#FFCD1F] py-4.5 font-semibold text-black/90 transition hover:bg-[#ffe07b]">
            Start your free trial
          </button>
          <ul className="mt-6 space-y-4 ">
            {plan.highlights.map((item) => (
              <li key={item} className="flex justify-start items-center gap-5">
                <FaCheck />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
