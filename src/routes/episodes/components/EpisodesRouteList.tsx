import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { EpisodesRouteListQuery } from "./__generated__/EpisodesRouteListQuery.graphql";

interface EpisodesRouteListProps {
    searchvalue: string;
    page:number
}

export function EpisodesRouteList({page,searchvalue}: EpisodesRouteListProps) {
  const query = useLazyLoadQuery<EpisodesRouteListQuery>(episodesQuery, {
    name: searchvalue,
    page:searchvalue?undefined:page,
  });
  const episodes = query?.episodes?.results
  if(!episodes||episodes?.length===0){
    return(
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">No episodes found</h1>
      </div>
    )
  }
return( <div className="w-full h-full flex flex-col items-center justify-center">
{episodes.map((episode)=>{
  if(!episode) return null
  const key = `${episode?.id}${episode?.name}`
  return(
    <div key={key} className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">{episode.name}</h1>
    </div>
  )
})}
</div>)
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
