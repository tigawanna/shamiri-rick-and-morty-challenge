import { Suspense } from "react";
import { SearchList, SearchListSuspenseFalllback } from "./SearchList";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { SearchInputSection } from "./SearchInputSection";
import { SearchType } from "./types";
interface SearchComponentProps {}

export function SearchComponent({}: SearchComponentProps) {
  const {
    debouncedValue,
    isDebouncing,
    startTransition,
    setDebouncedValue,
    searchType,
    setSearchType,
  } = useDebouncedSearchWithhParams<string, SearchType>({
    default_search_type: "LOCATION",
    default_search_query: "",
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <SearchInputSection
        debouncedValue={debouncedValue}
        isDebouncing={isDebouncing}
        setDebouncedValue={setDebouncedValue}
        searchType={searchType}
        setSearchType={setSearchType}
        startTransition={startTransition}
      />
      <div className="w-full overflow-auto">
        <Suspense fallback={<SearchListSuspenseFalllback />}>
          <SearchList
            searchType={searchType}
            searchvalue={debouncedValue}
            setSearchType={setSearchType}
          />
        </Suspense>
      </div>
    </div>
  );
}
