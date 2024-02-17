import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../shared/OneItemCard";
type EpisodesResponse =SearchListLocationsQuery$data["episodes"]



interface EpisodeLocationsProps {
  episodes: EpisodesResponse | undefined;
}

export function EpisodeLocations({episodes}: EpisodeLocationsProps) {
  if (!episodes) return null;
  if (!episodes?.results || episodes?.results?.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-xl font-bold text-secondary">
          No episodes found
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <ul className="flex flex-wrap gap-4 justify-center w-full">
        {episodes?.results?.map((item, idx) => {
          if (!item) return null;
          const key = `${item?.id}${item?.name}${idx}`;
          return (
            <OneItemCard
              href={`/episodes/${item?.id}`}
              key={key}
              id={item.id}
              name={item?.name}
            />
          );
        })}
      </ul>
      <ListPagination query_key="sp" total_pages={episodes?.info?.count ?? 1} />
    </div>
  );
}


