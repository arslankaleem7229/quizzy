export interface Benefit {
  title: string;
  description: string;
  accent: string;
}

export interface PlanHighlight {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  billing: string;
  highlights: string[];
}

export interface BillingCycle {
  cycle: "monthly" | "annual";
}
