import { Residents } from "../resident/Residents";
import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";

type LocationsResponse = SearchListLocationsQuery$data["locations"];
type OneLocationsResponseResults = NonNullable<LocationsResponse>["results"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
type CharacterLocation = NonNullable<
  ReadonlyToRegular<OneLocationsResponseResults>[number]
>;
interface OneLocationProps {
  location: CharacterLocation | null | undefined;
}

export function OneLocation({ location: loc }: OneLocationProps) {
  if (!loc) return null;
  const key = `${loc?.id}${loc?.name}`;
  return (
    <li key={key} className="flex flex-col rounded-lg w-full  gap-3 p-2">
      <h1 className="text-4xl font-bold text-secondary"> {loc.name}</h1>
      <Residents key={key} residents={loc?.residents} />
    </li>
  );
}
