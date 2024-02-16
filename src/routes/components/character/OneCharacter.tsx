import { SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";

type CharactersResponse = SearchListLocationsQuery$data["characters"];
type CharachterResult = NonNullable<CharactersResponse>["results"];
type ReadonlyToRegular<T> = T extends ReadonlyArray<infer U> ? Array<U> : never;
type CharacterLocation = NonNullable<
  ReadonlyToRegular<CharachterResult>[number]
>["location"];

interface OneCharacterProps {
  character: CharacterLocation | null | undefined;
}

export function OneCharacter({character}: OneCharacterProps) {
  if (!character) return null;
  return (
    <li  className="flex flex-col rounded-lg w-full  gap-3 p-2">
      <h1 className="text-4xl font-bold text-secondary"> {character?.name}</h1>
      {/* @ts-expect-error */}
      <OneLocation key={key} location={character?.location} />
    </li>
  );
}
