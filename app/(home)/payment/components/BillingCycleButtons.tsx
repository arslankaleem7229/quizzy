"use client";

import { useEffect, useRef, useState } from "react";

const BillingCycleButtons = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );

  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const [activeWidth, setActiveWidth] = useState(0);
  const [activeX, setActiveX] = useState(0);

  useEffect(() => {
    const el =
      billingCycle === "monthly" ? monthlyRef.current : annualRef.current;
    if (el) {
      setActiveWidth(el.offsetWidth);
      setActiveX(el.offsetLeft);
    }
  }, [billingCycle]);

  return (
    <div className="mt-6 inline-flex rounded-full relative border-(--primary) border-2 p-1 text-sm font-medium text-(--foreground)">
      <div
        style={{
          width: activeWidth,
          transform: `translateX(${activeX - 4}px)`,
        }}
        className={`absolute inset-y-1 rounded-full bg-(--primary) transition-all duration-300 ease-in-out -z-1`}
      />

      <button
        ref={monthlyRef}
        className={`rounded-full px-6 py-2 transition-all duration-300 ease-in-out text-(--foreground)`}
        onClick={() => setBillingCycle("monthly")}
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        className={`rounded-full px-6 py-2 transition-all duration-300 ease-in-out text-(--foreground)`}
        onClick={() => setBillingCycle("annual")}
      >
        Annually (Save 63%)
      </button>
    </div>
  );
};

export default BillingCycleButtons;
