import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { useMemo } from "react";
import {
  ItemWrapper,
  gridComponents,
} from "@/components/shared/VirtuosoVirtualList";
import { VirtuosoGrid } from "react-virtuoso";

type CharactersResponse = SearchListLocationsQuery$data["characters"];
interface CharacterLocationsProps {
  characters: CharactersResponse;
}

export function CharacterLocations({ characters }: CharacterLocationsProps) {
  if (!characters) return null;

  // const locations = characters?.results?.flatMap((char) => char?.location)??[]
  const character_locations = useMemo(() => {
    return characters?.results?.flatMap((char) => char?.location) ?? [];
  }, [characters]);

  if (!character_locations || character_locations?.length === 0) {
    return (
      <div className="w-full min-h-[60vh] h-full flex items-center justify-center">
        <h1 className="text-xl font-bold text-secondary bg-base-300 p-[10%] rounded-lg">
          No locations found for that location name
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <VirtuosoGrid
        style={{ height: "80vh", width: "100%" }}
        totalCount={character_locations?.length}
        data={character_locations}
        // @ts-expect-error
        components={gridComponents}
        itemContent={(index, one_episode) => {
          if (!one_episode) return null;
          const key = `${one_episode?.id}${one_episode?.name}`;
          return (
            <ItemWrapper>
              <OneItemCard
                href={`/locations/${one_episode?.id}`}
                key={key}
                id={one_episode?.id}
                name={one_episode?.name}
              />
            </ItemWrapper>
          );
        }}
      />
      <ListPagination
        query_key="scp"
        total_pages={characters?.info?.pages ?? 1}
      />
    </div>
  );
}
