import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
import { OneResident } from "../resident/OneResident";
import { Residents } from "../resident/Residents";

type CharactersResponse = SearchListLocationsQuery$data["characters"];
interface CharacterLocationsProps {
  characters: CharactersResponse;
}

export function CharacterLocations({ characters }: CharacterLocationsProps) {
  if (!characters) return null;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {characters?.results?.map((char, idx) => {
          if (!char) return null;
          const key = `${char?.id}${char?.name}${idx}`;
          return (
            <div className="w-full h-full" key={key}>
              <h1 className="text-xl font-bold text-secondary">{char.name}</h1>
            <Residents residents={char?.location?.residents} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
