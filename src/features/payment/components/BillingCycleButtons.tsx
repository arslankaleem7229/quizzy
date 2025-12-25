import { useBillingCycle } from "../hooks/useBillingCycle";

export default function BillingCycleButtons() {
  const { activeWidth, activeX, monthlyRef, setBillingCycle, annualRef } =
    useBillingCycle();
  return (
    <div className="mt-6 inline-flex rounded-full relative border-(--primary) border-2 p-1 text-sm font-medium text-(--textColor)">
      <div
        style={{
          width: activeWidth,
          transform: `translateX(${activeX - 4}px)`,
        }}
        className={`absolute inset-y-1 rounded-full bg-(--primary) transition-all duration-300 ease-in-out`}
      />

      <button
        ref={monthlyRef}
        className={`rounded-full px-6 py-2 transition-all duration-300 ease-in-out text-(--textColor) z-1`}
        onClick={() => setBillingCycle("monthly")}
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        className={`rounded-full px-6 py-2 transition-all duration-300 ease-in-out text-(--textColor) z-1`}
        onClick={() => setBillingCycle("annual")}
      >
        Annually (Save 63%)
      </button>
    </div>
  );
}
