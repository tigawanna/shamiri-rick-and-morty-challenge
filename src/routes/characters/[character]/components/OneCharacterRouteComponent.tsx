import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import dayjs from "dayjs"
import { OneCharacterRouteComponentQuery } from "./__generated__/OneCharacterRouteComponentQuery.graphql";
import { OneItemHeader } from "@/routes/components/shared/OneItemHeader";
import { OneItemCard } from "@/routes/components/shared/OneItemCard";
interface OneCharacterRouteComponentProps {
  id: string;
}

export function OneCharacterComponent({
  id,
}: OneCharacterRouteComponentProps) {
  const query = useLazyLoadQuery<OneCharacterRouteComponentQuery>(oneCharacterQuery, {
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


  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-4">

      <OneItemHeader 
      id={character.id}
      name={character.name}
      title={<h2 className="text-xl font-bold">Episodes</h2>} />
      <div className="w-full h-full flex flex-col items-center justify-beteween">
        {episodes && (
          <ul className="flex flex-wrap justify-center w-full gap-2">
            {episodes.map((chr) => {
              if (!chr) return null;
              const key = `${chr?.id}${chr?.name}`;
              return (
   
                <OneItemCard href={`/episodes/${chr.id}`} key={key} id={chr.id} name={chr.name} 
                created={chr.created}/>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export const oneCharacterQuery = graphql`
  query OneCharacterRouteComponentQuery($id: ID!) {
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
