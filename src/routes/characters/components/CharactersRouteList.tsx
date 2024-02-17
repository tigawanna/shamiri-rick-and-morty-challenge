import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { CharactersRouteListQuery } from "./__generated__/CharactersRouteListQuery.graphql";
import { OneResidentCard } from "@/routes/components/shared/OneResidentCard";

interface CharacterRouteListProps {
  searchvalue: string;
  page: number;
}

export function CharacterRouteList({
  page,
  searchvalue,
}: CharacterRouteListProps) {
  const page_to_fetch = searchvalue != null ? undefined : page;
  const query = useLazyLoadQuery<CharactersRouteListQuery>(charactersQuery, {
    name: searchvalue,
    page: page_to_fetch,
  });
  const characters = query?.characters?.results;
  if (!characters || characters?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">No characters found</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center  gap-2">
      <div className="w-full flex  p-1">
        <h1 className="text-3xl font-bold text-secondary">Characters</h1>
      </div>
      <ul className="flex flex-wrap justify-center w-full gap-2">
        {characters.map((character) => {
          if (!character) return null;
          const key = `${character?.id}${character?.name}`;

          return (
            <OneResidentCard
              key={key}
              href={`/characters/${character.id}`}
              id={character.id}
              name={character.name}
              img={character.image}
              status={character.status}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const charactersQuery = graphql`
  query CharactersRouteListQuery($name: String!, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        image
        status
      }
    }
    # end of characters query

    #  end of query
  }
`;
