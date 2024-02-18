import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";
import { forwardRef } from "react";
import {
  ItemWrapper,
  gridComponents,
} from "@/components/shared/VirtuosoVirtualList";

type EpisodesResponse = SearchListLocationsQuery$data["episodes"];

interface EpisodeLocationsProps {
  episodes: EpisodesResponse | undefined;
}

export function EpisodeLocations({ episodes }: EpisodeLocationsProps) {
const episode_locations = React.useMemo(() => {
    return (
      episodes?.results
        ?.flatMap((e) => e?.characters)
        .flatMap((c) => c?.location) ?? []
    );
  }, [episodes]);


  if (!episode_locations || episode_locations?.length === 0) {
    return (
      <div className="w-full min-h-[60vh] h-full flex items-center justify-center">
        <h1 className="text-xl font-bold text-secondary bg-base-300 p-[10%] rounded-lg">
          No locations found in that episode name
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col relative gap-3 h-full min-h-[60vh]">

        <VirtuosoGrid
          style={{ height: "80vh", width: "100%" }}
          totalCount={episode_locations?.length}
          data={episode_locations}
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



      <div className="w-full flex  ">
        <ListPagination
          query_key="sep"
          total_pages={episodes?.info?.pages ?? 1}
        />
      </div>
    </div>
  );
}
