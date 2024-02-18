import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
type CharactersResponse = SearchListLocationsQuery$data["characters"];
interface CharacterLocationsProps {
  characters: CharactersResponse;
}

export function CharacterLocations({ characters }: CharacterLocationsProps) {
  if (!characters) return null;
  const locations = characters?.results?.flatMap((char) => char?.location)??[]
  if (!locations || locations?.length === 0) {
    return (
      <div className="w-full min-h-[60vh] h-full flex items-center justify-center">
        <h1 className="text-xl font-bold text-secondary bg-base-300 p-[10%] rounded-lg">
          No locations found for that location name
        </h1>
      </div>
    );
  }
  console.log("===== locations in chracter ==== ", characters);
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <ul className="flex flex-wrap gap-4 justify-center w-full">
        {locations?.map((char, idx) => {
          if (!char) return null;
          const key = `${char?.id}${char?.name}${idx}`;
          return (
            <OneItemCard
              href={`/locations/${char?.id}`}
              key={key}
              id={char.id}
              name={char?.name}
            />
          );
        })}
      </ul>
      <ListPagination
        query_key="scp"
        total_pages={characters?.info?.pages ?? 1}
      />
    </div>
  );
}
