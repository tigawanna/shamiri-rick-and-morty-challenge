import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";

type LocationssResponse = SearchListLocationsQuery$data["locations"];
type LoactionsResult = NonNullable<LocationssResponse>["results"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
type Residents = NonNullable<
  ReadonlyToRegular<LoactionsResult>[number]
>["residents"];
interface OneResidentProps {
  resident: Residents[number];
}

export function OneResident({ resident }: OneResidentProps) {
  if (!resident) return null
  
  const status_badge_styles = () => {
    switch (resident.status) {
      case "Alive":
        return "badge-success";
      case "Dead":
        return "badge-error";
      case "unknown":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };
  return (
    <li
      key={`r${resident?.id}${resident?.name}`}
      className="flex flex-col p-2 rounded-lg bg-base-300 gap-2 w-[95%] sm:w-[46%] md:w-[30%] lg:w-[24%]"
    >
      <img
        className="w-auto aspect-square h-250px"
        src={resident?.image ?? "/placeholder.webp"}
        loading="lazy"
        alt={resident.name ?? "resident"}
        height={250}
        width={250}
      />
      <div className="flex flex-col  justify-center ">
        <h2 className="text-lg font-bold">{resident?.name}</h2>
        <span
          data-tip={"status:" + resident?.status}
          className="flex  items-center gap-1 text-lg tooltip hover:tooltip-open tooltip-bottom"
        >
          status:
          <h3 className={`badge ${status_badge_styles()}`}>
            {" "}
            {resident?.status}
          </h3>
        </span>
      </div>
    </li>
  );
}
