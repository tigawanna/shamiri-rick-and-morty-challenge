import { PageProps } from "rakkasjs";
import { CharacterRouteList } from "./components/CharactersRouteList";
import { SearchBox } from "@/components/shared/SearchBox";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { Suspense } from "react";
import { GridSuspenseFallback } from "@/components/shared/GridSuspenseFallback";
export default function CharactersPage({}: PageProps) {
  const { isDebouncing, debouncedValue, setDebouncedValue } =
    useDebouncedSearchWithhParams({
      default_search_query: "",
    });
  const { search_param } = useCustomSearchParams({
    key: "cp",
    default_value: "1",
  });
  const page = parseInt(search_param ?? "1");
  return (
    <div className="w-full h-fit  flex flex-col gap-2 overflow-y-auto ">
      <SearchBox
        inputProps={{
          placeholder: "Search through chharacters",
        }}
        debouncedValue={debouncedValue}
        isDebouncing={isDebouncing}
        setDebouncedValue={setDebouncedValue}
      />
      <Suspense fallback={<GridSuspenseFallback />}>
        <CharacterRouteList page={page} searchvalue={debouncedValue} />
      </Suspense>
   
    </div>
  );
}
