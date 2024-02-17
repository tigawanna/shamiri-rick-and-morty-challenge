import { PageProps } from "rakkasjs";
import { CharacterRouteList } from "./components/CharactersRouteList";
import { SearchBox } from "@/components/shared/SearchBox";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
export default function CharactersPage({}: PageProps) {
  const { isDebouncing, debouncedValue, setDebouncedValue } =
    useDebouncedSearchWithhParams({
      default_search_query: "",
    });
  const { search_param } = useCustomSearchParams({
    key: "cp",
    default_value: "1",
  });
  const page = parseInt(search_param??"1");
  return (
    <div className="w-full h-full  flex flex-col gap-2 overflow-y-auto ">
      <SearchBox
        debouncedValue={debouncedValue}
        isDebouncing={isDebouncing}
        setDebouncedValue={setDebouncedValue}
      />

      <CharacterRouteList page={page} searchvalue={debouncedValue} />
    </div>
  );
}
