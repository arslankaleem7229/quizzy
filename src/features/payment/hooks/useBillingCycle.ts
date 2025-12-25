import { useEffect, useRef, useState } from "react";

export function useBillingCycle() {
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

  return {
    billingCycle,
    setBillingCycle,
    monthlyRef,
    annualRef,
    activeWidth,
    activeX,
  };
}
