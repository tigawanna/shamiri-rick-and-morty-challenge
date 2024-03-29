import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import dayjs from "dayjs";
import { OneResidentCard } from "@/routes/components/shared/OneResidentCard";
import { OneEpisodeRouteComponentQuery } from "./__generated__/OneEpisodeRouteComponentQuery.graphql";
import { OneItemHeader } from "@/routes/components/shared/OneItemHeader";
interface OneEpisodeRouteComponentProps {
  id: string;
}

export function OneEpisodeComponent({ id }: OneEpisodeRouteComponentProps) {
  const query = useLazyLoadQuery<OneEpisodeRouteComponentQuery>(
    oneEpisodesQuery,
    {
      id,
    },
  );
  const episode = query?.episode;
  const characters = episode?.characters;
  if (!episode) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">
          Episode woth id {id} was not found
        </h1>
      </div>
    );
  }
  const episode_date = dayjs(episode?.created).format("DD-MM-YYYY");

  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-4">
      <div className="flex flex-col p-3  gap-2   w-full sticky top-0 bg-base-200 rounded-lg">
        {/* <div className="flex flex-col gap-2">
          <div className="flex flex-col ">
            <h1 className="text-xl font-bold">{episode.id}.</h1>
            <h1 className="text-xl ">{episode.name}</h1>
          </div>
          {episode_date && <h1 className="text-">created: {episode_date}</h1>}
        </div> */}
        <OneItemHeader
          name={episode.name}
          date={episode_date}
          id={episode.id}
          list_title="Characters"
        />

      </div>

      <div className="w-full h-full flex flex-col items-center justify-beteween">
        {characters && (
          <ul className="flex flex-wrap justify-center w-full gap-2">
            {characters.map((chr) => {
              if (!chr) return null;
              const key = `${chr?.id}${chr?.name}`;
              return (
                <OneResidentCard
                  href={`/characters/${chr.id}`}
                  key={key}
                  id={chr.id}
                  name={chr.name}
                  img={chr.image}
                  status={chr.status}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export const oneEpisodesQuery = graphql`
  query OneEpisodeRouteComponentQuery($id: ID!) {
    # start of query
    episode(id: $id) {
      id
      name
      created
      characters {
        id
        image
        name
        status
      }
    }
    # end of episodes query

    #  end of query
  }
`;
