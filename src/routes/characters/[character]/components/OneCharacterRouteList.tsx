import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import dayjs from "dayjs"
import { OneCharacterRouteListQuery } from "./__generated__/OneCharacterRouteListQuery.graphql";
interface CharactersRouteListProps {
  id: string;
}

export function OneCharacterComponent({
  id,
}: CharactersRouteListProps) {
  const query = useLazyLoadQuery<OneCharacterRouteListQuery>(oneCharacterQuery, {
    id,
  });
  const character = query?.character;
  const episodes = character?.episode;
  if (!character) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">
          Character woth id {id} was not found
        </h1>
      </div>
    );
  }
  const character_date = dayjs(character?.created).format("DD-MM-YYYY");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-4">
      <div className="flex flex-col p-3  gap-2   w-full sticky top-0 bg-base-200 rounded-lg">
        <span className="flex gap-2 underline">
          <h1 className="text-xl font-bold">{character.id}.</h1>
          <h1 className="text-xl ">{character.name}</h1>
          {character_date && <h1 className="text-xl">{character_date}</h1>}
        </span>
        <h2 className="text-2xl font-bold">Episodes</h2>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-beteween">
        {episodes && (
          <ul className="flex flex-wrap justify-center w-full gap-2">
            {episodes.map((chr) => {
              if (!chr) return null;
              const key = `${chr?.id}${chr?.name}`;
              return (
                <li
                  key={key}
                  className="flex flex-col items-center p-2 rounded-lg bg-base-300
               gap-2 w-fit"
                >
                  <span className="flex justify-start items-start gap-2">
                    <h1 className="">{chr.id}.</h1>
                    <h1 className="">{chr.name}</h1>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export const oneCharacterQuery = graphql`
  query OneCharacterRouteListQuery($id: ID!) {
    # start of query
    character(id: $id) {
      episode {
        air_date
        created
        id
        name
      }
  
      id
      name
      image
      created
    }
    # end of episodes query

    #  end of query
  }
`;
