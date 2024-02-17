import { SearchListLocationsQuery$data } from "../__generated__/SearchListLocationsQuery.graphql";
import { OneItemCard } from "../../shared/OneItemCard";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
type CharactersResponse = SearchListLocationsQuery$data["characters"];
interface CharacterLocationsProps {
  characters: CharactersResponse;
}

export function CharacterLocations({ characters }: CharacterLocationsProps) {
  if (!characters) return null;
  if (!characters?.results || characters?.results?.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-xl font-bold text-secondary">
          No characters found
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <ul className="flex flex-wrap gap-4 justify-center w-full">
        {characters?.results?.map((char, idx) => {
          if (!char) return null;
          const key = `${char?.id}${char?.name}${idx}`;
          return (
            <OneItemCard
              href={`/characters/${char?.id}`}
              key={key}
              id={char.id}
              name={char?.name}
            />
          );
        })}
      </ul>
      <ListPagination
        query_key="scp"
        total_pages={characters?.info?.count ?? 1}
      />
    </div>
  );
}
