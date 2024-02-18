import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

type EpisodesResponse = SearchListLocationsQuery$data["episodes"];

interface EpisodeLocationsProps {
  episodes: EpisodesResponse | undefined;
}

export function EpisodeLocations({ episodes }: EpisodeLocationsProps) {
  const parentRef = React.useRef(null);

  // const episode_locations =
  //   episodes?.results
  //     ?.flatMap((e) => e?.characters)
  //     .flatMap((c) => c?.location) ?? [];
const episode_locations = React.useMemo(() => {
  return (
    episodes?.results
      ?.flatMap((e) => e?.characters)
      .flatMap((c) => c?.location) ?? []
  );
}, [episodes]);

  const rowVirtualizer = useVirtualizer({
    count: episode_locations?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });
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
    <div className="w-full h-full flex flex-col gap-3 ">
      <div ref={parentRef} className="h-fit">
        <ul className="flex flex-wrap gap-4 justify-center w-full ">
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const one_episode = episode_locations[virtualItem.index];
            return (
              <OneItemCard
                href={`/locations/${one_episode?.id}`}
                key={virtualItem.key}
                id={one_episode?.id}
                name={one_episode?.name}
              />
            );
          })}
        </ul>
      </div>

      <ListPagination
        query_key="sep"
        total_pages={episodes?.info?.pages ?? 1}
      />
    </div>
  );
}
