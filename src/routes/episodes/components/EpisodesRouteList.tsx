import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { EpisodesRouteListQuery } from "./__generated__/EpisodesRouteListQuery.graphql";

interface EpisodesRouteListProps {
    searchvalue: string;
    page:number
}

export function EpisodesRouteList({page,searchvalue}: EpisodesRouteListProps) {
  const query = useLazyLoadQuery<EpisodesRouteListQuery>(episodesQuery, {
    name: searchvalue,
    page: 1,
  });
  return <div className="w-full h-full flex items-center justify-center"></div>;
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
        characters {
          location {
            id
            name
          }
        }
      }
    }
    # end of episodes query

    #  end of query
  }
`;
