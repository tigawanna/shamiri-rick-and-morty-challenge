import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { OneItemCard } from "@/routes/components/shared/OneItemCard";
import { LocationRouteListQuery } from "./__generated__/LocationRouteListQuery.graphql";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";

interface LocationRouteListProps {
   searchvalue: string;
  page: number;
}

export function LocationRouteList({
  page,
  searchvalue,

}: LocationRouteListProps) {
  const page_to_fetch = searchvalue ? 1 : page;
  const query = useLazyLoadQuery<LocationRouteListQuery>(locationsQuery, {
    name: searchvalue,
    page: page_to_fetch,
  });
  const locations = query?.locations?.results;
  if (!locations || locations?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">No locations found</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <ul className="flex flex-wrap justify-center w-full gap-2 pb-5">
        {locations.map((location) => {
          if (!location) return null;
          const key = `${location?.id}${location?.name}`;
          return (
            <OneItemCard
              key={key}
              id={location.id}
              name={location.name}
              href={`/locations/${location.id}`}
            />
          );
        })}
      </ul>
      <ListPagination
        query_key="lp"
        total_pages={query?.locations?.info?.pages ?? 10}
      />
    </div>
  );
}

export const locationsQuery = graphql`
  query LocationRouteListQuery($name: String!, $page: Int) {
    locations(page: $page,filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        created
        id
        name
      }
    }
    # end of episodes query

    #  end of query
  }
`;
