import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { OneEpisodesRouteListQuery } from "./__generated__/OneEpisodesRouteListQuery.graphql";
import { OneCharacter } from "@/routes/components/character/OneCharacter";
import dayjs from "dayjs"
interface EpisodesRouteListProps {
  id: string;
}

export function OneEpisodeComponent({
  id,
}: EpisodesRouteListProps) {
  const query = useLazyLoadQuery<OneEpisodesRouteListQuery>(oneEpisodesQuery, {
    id,
  });
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
        <span className="flex gap-2 underline">
          <h1 className="text-xl font-bold">{episode.id}.</h1>
          <h1 className="text-xl ">{episode.name}</h1>
          {episode_date && <h1 className="text-xl">{episode_date}</h1>}
        </span>
        <h2 className="text-2xl font-bold">Characters</h2>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-beteween">
        {characters && (
          <ul className="flex flex-wrap justify-center w-full gap-2">
            {characters.map((chr) => {
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

export const oneEpisodesQuery = graphql`
  query OneEpisodesRouteListQuery($id:ID!) {
    # start of query
  episode(id: $id) {
      id
      name
    created
      characters {
        id
        image
        name
      }
    }
    # end of episodes query

    #  end of query
  }
`;
