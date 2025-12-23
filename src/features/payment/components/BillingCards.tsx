import { FaCheck } from "react-icons/fa";

const plans = [
  {
    id: "plus",
    name: "Quizlet Plus",
    subtitle: "Level up with more study tools",
    price: "£2.99",
    billing: "Billed at £35.99/year",
    highlights: [
      "3 practice tests per month",
      "3 Q&A and textbook solutions per month*",
      "20 rounds of Learn questions per month",
      "Complete access to games and activities",
      "Millions of flashcards",
      "Ad-free studying",
    ],
  },
  {
    id: "plus-unlimited",
    name: "Quizlet Plus Unlimited",
    subtitle: "Full access to powerful tools",
    price: "£3.74",
    billing: "Billed at £44.99/year",
    highlights: [
      "Complete access to practice tests",
      "Millions of textbook solutions*",
      "Unlimited rounds of Learn questions",
      "Complete access to games and activities",
      "Millions of flashcards",
      "Ad-free studying",
    ],
  },
];

const BillingCards = () => {
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
};

export default BillingCards;
