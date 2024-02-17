import { PageProps } from "rakkasjs"
import { LocationRouteList } from "./components/LocationRouteList"
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { SearchBox } from "@/components/shared/SearchBox";
export default function LocationsPage({params}:PageProps) {
  const { isDebouncing, debouncedValue, setDebouncedValue } =
    useDebouncedSearchWithhParams({
      default_search_query: "",
    });
  const { search_param } = useCustomSearchParams({
    key: "lp",
    default_value: "1",
  });
  const page = parseInt(search_param??"1");

return (
  <div className="w-full h-fit   ">
    <SearchBox
      debouncedValue={debouncedValue}
      isDebouncing={isDebouncing}
      setDebouncedValue={setDebouncedValue}
    />
    <LocationRouteList page={page} searchvalue={debouncedValue} />
  </div>
);}
;
