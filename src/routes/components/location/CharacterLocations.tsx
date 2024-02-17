import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
import { Residents } from "../resident/Residents";
import { Virtuoso } from "react-virtuoso";
type CharactersResponse = SearchListLocationsQuery$data["characters"];
interface CharacterLocationsProps {
  characters: CharactersResponse;
}

export function CharacterLocations({ characters }: CharacterLocationsProps) {
  if (!characters) return null;
  if (!characters?.results) {
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
      {/* <Virtuoso
        style={{ height: "100%" }}
        data={characters?.results}
        itemContent={(idx, char) => {
          if (!char) return null;
          const key = `${char?.id}${char?.name}${idx}`;
          return (
            <div className="w-full h-full" key={key}>
              <h1 className="text-xl font-bold text-secondary">{char.name}</h1>
              <Residents residents={char?.location?.residents} />
            </div>
          );
        }}
      /> */}
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
