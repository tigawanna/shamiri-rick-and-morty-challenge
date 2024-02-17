import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { OneLocation } from "../location/OneLocation";
import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";

type CharactersResponse = SearchListLocationsQuery$data["characters"];
type CharachterResult = NonNullable<CharactersResponse>["results"];



interface CharactersProps {
    characters: CharachterResult |null |undefined ;
}

export function Characters({characters}: CharactersProps) {
if(!characters) return null
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ul className="flex flex-wrap gap-4 justify-center w-full ">
        {characters?.map((chr, idx) => {
          if (!chr) return null;
          const key = `${chr?.id}${chr?.name}`;
          return (
            <li
              key={key}
              className="flex flex-col rounded-lg w-full  gap-3 p-2"
            >
              <h1 className="text-4xl font-bold text-secondary"> {chr.name}</h1>
              {/* @ts-expect-error */}
              <OneLocation key={key} location={chr?.location} />
            </li>
          );
        })}
      </ul>

    </div>
  );
}
