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

  if (!character) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">
          Character woth id {id} was not found
        </h1>
      </div>
    );
  }
  const status_badge_styles = (status?: string|null) => {
    switch (status) {
      case "Alive":
        return "badge-success";
      case "Dead":
        return "badge-error";
      case "unknown":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-4">
      <div className="w-full  flex justify-center items-center   flex-col sm:flex-row gap-3">
        <div className="w-full p-2 flex h-full flex-col justify-center  items-center bg-base-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{character.id}.</h2>
          <h2 className="text-3xl font-bold">{character.name}.</h2>
          <span
            data-tip={"status:" + status}
            className="flex items-center gap-1 text-lg tooltip hover:tooltip-open tooltip-bottom"
          >
            status:
            <h3 className={`badge ${status_badge_styles(character?.status)}`}>
              {character.status}
            </h3>
          </span>
        </div>
        <img
          className="w-full max-w-[300px] h-auto max-h-[200px] sm:max-h-auto sm:w-auto sm:h-full aspect-square object-cover"
          src={character.image ?? "/placeholder.webp"}
          loading="lazy"
          alt={character.name ?? "resident"}
          height={"200px"}
          width={"200px"}
        />
      </div>

      {/* <div className="w-full h-full flex flex-col items-center justify-beteween">
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
      </div> */}
    </div>
  );
}

export const oneCharacterQuery = graphql`
  query OneCharacterRouteComponentQuery($id: ID!) {
    # start of query
    character(id: $id) {

  
      id
      name
      image
      created
      status
    }
    # end of episodes query

    #  end of query
  }
`;
