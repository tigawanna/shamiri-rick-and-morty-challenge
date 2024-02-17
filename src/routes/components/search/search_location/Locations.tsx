import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
type LocationsResponse = SearchListLocationsQuery$data["locations"];
type OneLocationsResponseResults = NonNullable<LocationsResponse>;

interface LocationsProps {
  locations: OneLocationsResponseResults | null | undefined;
}

export function Locations({ locations }: LocationsProps) {
  if (!locations) return null;
  const locations_list = locations?.results;
    if (!locations_list || locations_list?.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-xl font-bold text-secondary">
            No locations found
          </h1>
        </div>
      );
    }
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <ul className="flex flex-wrap gap-4 justify-center w-full ">
        {locations_list?.map((loc, idx) => {
          if (!loc) return null;
          const key = `${loc?.id}${loc?.name}`;
          return (
            <OneItemCard
              href={`/locations/${loc?.id}`}
              key={key}
              id={loc.id}
              name={loc?.name}
            />
          );
        })}
      </ul>
      <ListPagination
        query_key="slp"
        total_pages={locations?.info?.pages ?? 1}
      />
    </div>
  );
}

export function LocationsSuspenseFallback() {
  const dummy_locations = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    residents: Array.from({ length: 10 }).map((_, i) => ({
      id: i.toString(),
    })),
  }));
  return (
    <div className="w-full h-full flex flex-col ">
      <ul className="flex flex-wrap gap-4 justify-center w-full ">
        {dummy_locations?.map((loc) => {
          if (!loc) return null;
          return (
            <div
              key={loc.id}
              className="flex flex-col rounded-lg w-full  gap-3 p-2 bg-secondary/5"
            >
              <h1 className=" h-5 skeleton rounded-lg w-[50%]"></h1>
              <ul className="flex flex-wrap gap-2 w-full justify-center  rounded-lg">
                {loc.residents.map((resident) => {
                  if (!resident) return null;

                  return (
                    <li
                      key={resident?.id}
                      className="flex flex-col p-2 rounded-lg bg-base-100 gap-2 w-[95%] sm:w-[46%] md:w-[30%] lg:w-[24%]"
                    >
                      <div className="w-auto aspect-square h-250px skeleton rounded-xl"></div>

                      <h2 className="w-[50%] h-5 skeleton rounded-lg"></h2>
                      <h3 className=" h-4 w-[90%] skeleton rounded-lg"></h3>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </ul>

    </div>
  );
}
