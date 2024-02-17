import { SearchBox } from "@/components/shared/SearchBox";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { PageProps } from "rakkasjs";
import { EpisodesRouteList } from "./components/EpisodesRouteList";

export default function EpisodesPage({}: PageProps) {
  const {
    isDebouncing,
    debouncedValue,
    setDebouncedValue,
  } = useDebouncedSearchWithhParams({
    default_search_query: "",
    });
    const {search_param,updateSeachparams } = useCustomSearchParams({key:"ep",default_value:"1"});
    const page=parseInt(search_param)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <SearchBox
        debouncedValue={debouncedValue}
        isDebouncing={isDebouncing}
        setDebouncedValue={setDebouncedValue}
      />
      <EpisodesRouteList page={page} searchvalue={debouncedValue}/>
    </div>
  );
}
