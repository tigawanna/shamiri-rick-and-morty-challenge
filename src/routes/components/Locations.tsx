import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { LocationsQuery } from "./__generated__/LocationsQuery.graphql";
interface LocationsProps {}

export function Locations({}: LocationsProps) {
  const query = useLazyLoadQuery<LocationsQuery>(locationsQuery, {});
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap gap-1 justify-center">
        {query.locations?.results?.map((location) => {
          if (!location) return null;
          return <div key={location.id}>{location.name}</div>;
        })}
      </div>
    </div>
  );
}

export const locationsQuery = graphql`
  query LocationsQuery {
    locations(page: 1) {
      info {
        count
        next
        pages
        prev
      }
      results {
        created
        dimension
        id
        name
        type
      }
    }
  }
`;
