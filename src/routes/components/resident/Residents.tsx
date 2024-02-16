import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
import { OneResident } from "./OneResident";

type LocationssResponse = SearchListLocationsQuery$data["locations"];
type LoactionsResult = NonNullable<LocationssResponse>["results"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
type Residents = NonNullable<
  ReadonlyToRegular<LoactionsResult>[number]
>["residents"];
interface ResidentsProps {
  residents: Residents | null | undefined;
}

export function Residents({ residents }: ResidentsProps) {
  if (!residents) return null;
  return (
    <ul className="flex flex-wrap rounded-lg w-full  gap-3 p-2">
      {residents.map((res, idxb) => {
        const key = `${res?.id}${res?.name} ${idxb}`;
        return <OneResident resident={res} key={key} />;
      })}
    </ul>
  );
}
