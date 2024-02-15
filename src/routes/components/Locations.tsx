import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { LocationsQuery } from "./__generated__/LocationsQuery.graphql";
interface LocationsProps {}

export function Locations({}: LocationsProps) {
  const query = useLazyLoadQuery<LocationsQuery>(locationsQuery, {});
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center w-full ">
        {query.locations?.results?.map((location) => {
          if (!location) return null;
          return (
            <div key={location.id} className="flex flex-col rounded-lg w-full  gap-3 p-2">
              <h1 className="text-4xl font-bold text-secondary"> {location.name}</h1>
              <ul className="flex flex-wrap gap-2 w-full justify-center bg-secondary/10 rounded-lg">
                {location.residents.map((resident) => {
                  if (!resident) return null
             
                    return (
                      <li
                        key={resident?.id}
                        className="flex flex-col p-2 rounded-lg bg-base-300 gap-2 w-[95%] sm:w-[46%] md:w-[30%] lg:w-[24%]"
                      >
                        <img
                          className="w-auto aspect-square h-250px"
                          src={resident?.image??"/placeholder.webp"}
                          loading="lazy"
                          alt={resident.name??"resident"}
                          height={250}
                          width={250}
                          />
                        <h2 className="text-lg font-bold">{resident?.name}</h2>
                          <h3>{resident?.status}</h3>
                      </li>
                    );
                })}
              </ul>
            </div>
          );
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
        residents {
          id
          name
          status
          image
        }
      }
    }
  }
`;
