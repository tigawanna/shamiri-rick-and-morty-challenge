import { useEffect, useState, useTransition } from "react";
import { useDebouncedValue } from "./debounce";
import { navigate, useLocation } from "rakkasjs";

interface UseSearchWithQuery {
  search_query?: boolean;
  default_value?: string;
}
export function useSearchWithQuery(
  opts: UseSearchWithQuery = {
    search_query: true,
  },
) {
  const { current } = useLocation();
  const [_, startTransition] = useTransition();
  const url = current;
  const [keyword, setKeyword] = useState(
    url?.searchParams?.get("q") ?? opts.default_value ?? "",
  );
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  // useEffect(() => {
  //   if (current) {
  //     setKeyword(url?.searchParams?.get("q") ?? "");
  //   }
  // },[])
  useEffect(() => {
    if (current && debouncedValue) {
      startTransition(() => {
        url?.searchParams?.set("q", debouncedValue);
        navigate(url);
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}



interface UseDebouncedSearchWithhParams<SQ extends string,ST extends string> {
  default_search_query?:SQ;
  default_search_type?:ST
}

export function useDebouncedSearchWithhParams<SQ extends string,ST extends string>({default_search_query,default_search_type}:UseDebouncedSearchWithhParams<SQ ,ST>) {
  const { current } = useLocation();
  const initSearchType = current.searchParams.get("st") as ST| null;
  const initSearchValue = current.searchParams.get("sq") ?? "";
  const defaultSearchType = initSearchType ?? default_search_type
  const [, startTransition] = useTransition();
  const { debouncedValue, setDebouncedValue, isDebouncing } = useDebouncedValue(
    initSearchValue,
    2000,
  );
  const [searchType, setSearchType] = useState<ST|undefined>(defaultSearchType);
  useEffect(() => {
    console.log("useEffect 1  fired");
    if (debouncedValue !== initSearchValue) {
   console.log("useEffect 1  fired   debouncedValue !== initSearchValue  ",debouncedValue!==initSearchValue);
      setDebouncedValue(initSearchValue);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect 2  fired");
    // console.log({debouncedValue,initSearchValue,searchType,initSearchType})
    const new_url = new URL(current);
    if ((!debouncedValue || debouncedValue === "") ) {
      console.log(
        "useEffect 2  fired   debouncedValue !== initSearchValue deleting sq  ",
        !debouncedValue || debouncedValue === "",
      );
      new_url.searchParams.delete("sq");
    }
    if (debouncedValue && debouncedValue !== initSearchValue) {
      console.log(
        "useEffect 2  fired   debouncedValue !== initSearchValue setting sq  ",
        debouncedValue && debouncedValue !== initSearchValue,
      );
      new_url.searchParams.set("sq", debouncedValue);
    }
    if (searchType && searchType !== initSearchType) {
      console.log(
        "useEffect 2  fired   debouncedValue !== initSearchValue  setting st ",
        searchType && searchType !== initSearchType,
      );
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
