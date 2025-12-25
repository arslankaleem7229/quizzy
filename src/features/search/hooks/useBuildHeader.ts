import { usePathname, useSearchParams } from "next/navigation";
import { Tab } from "../types";

export default function useBuildHeader(tabs: Tab[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const normalizedFilter = filterParam ? normalizeFilter(filterParam) : "";

  const activeTabLabel =
    tabs.find((tab) => {
      if (!normalizedFilter || normalizedFilter === "all") {
        return tab.label === "All results";
      }
      const tabKey = normalizeFilter(tab.filter ?? tab.label);
      return tabKey === normalizedFilter;
    })?.label ?? tabs[0].label;

  const buildHref = (tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab.filter) {
      params.set("filter", tab.filter);
    } else {
      params.delete("filter");
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  return { buildHref, activeTabLabel };
}

const normalizeFilter = (value: string) =>
  value.toLowerCase().replace(/[^a-z]/g, "");
