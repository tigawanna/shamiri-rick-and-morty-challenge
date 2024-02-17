import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
import { Residents } from "../resident/Residents";
import { Virtuoso } from "react-virtuoso";
import { OneItemCard } from "../shared/OneItemCard";
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
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center w-full">
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
      </div>
    </div>
  );
}
