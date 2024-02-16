import { useEffect, useState, useTransition } from "react";
import { navigate, useLocation } from "rakkasjs";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { SearchType } from "./types";

export function useDebouncedSearchWithhParams() {
  const { current } = useLocation();
  const initSearchType = current.searchParams.get("st") as SearchType | null;
  const initSearchValue = current.searchParams.get("sq") ?? "";

  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    initSearchValue,
    5000,
  );
  const [searchType, setSearchType] = useState<SearchType>(
    initSearchType ?? "LOCATION",
  );
  useEffect(() => {
    if (debouncedValue !== initSearchValue) {
      setDebouncedValue(initSearchValue);
    }
  }, []);
  useEffect(() => {
    const new_url = new URL(current);
    if ((!debouncedValue || debouncedValue === "") && !isDebouncing) {
      new_url.searchParams.set("sq", "");
    }
    if (debouncedValue && debouncedValue !== initSearchValue) {
      new_url.searchParams.set("sq", debouncedValue);
    }
    if (searchType && searchType !== initSearchType) {
      new_url.searchParams.set("st", searchType);
    }
    startTransition(() => {
      navigate(new_url.toString());
    });
  }, [debouncedValue, searchType]);

  return {
    debouncedValue,
    setDebouncedValue,
    isDebouncing,
    searchType,
    setSearchType,
    startTransition,
    current,
  };
}
