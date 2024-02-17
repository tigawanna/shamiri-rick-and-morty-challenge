import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { EpisodesRouteListQuery } from "./__generated__/EpisodesRouteListQuery.graphql";
import { Link } from "rakkasjs";
import { OneItemCard } from "@/routes/components/shared/OneItemCard";

interface EpisodesRouteListProps {
  searchvalue: string;
  page: number;
}

export function EpisodesRouteList({
  page,
  searchvalue,
}: EpisodesRouteListProps) {
  const page_to_fetch = searchvalue != null ? undefined : page;
  const query = useLazyLoadQuery<EpisodesRouteListQuery>(episodesQuery, {
    name: searchvalue,
    page: page_to_fetch,
  });
  const episodes = query?.episodes?.results;
  if (!episodes || episodes?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">No episodes found</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-wrap justify-center w-full gap-2">
        {episodes.map((episode) => {
          if (!episode) return null;
          const key = `${episode?.id}${episode?.name}`;
          return (
            <OneItemCard
              key={key}
              id={episode.id}
              name={episode.name}
              href={`/episodes/${episode.id}`}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const episodesQuery = graphql`
  query EpisodesRouteListQuery($name: String!, $page: Int) {
    # start of query
    # start of episodes query
    # unlike the rest of the queries , this one cannot return the residets of the episode locations
    #  as the query would exceed maximum depth allowance
    #  we'll return the loactions ids and fetch the locations in the child component
    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
      }
    }
    # end of episodes query

    #  end of query
  }
`;
