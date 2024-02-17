import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { CharactersRouteListQuery } from "./__generated__/CharactersRouteListQuery.graphql";
import { Link } from "rakkasjs";

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
          const status_badge_styles = () => {
            switch (character.status) {
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
            <Link
              href={`/characters/${character.id}`}
              key={key}
              className="flex flex-col p-2 rounded-lg bg-base-300 gap-2 w-[95%] sm:w-[46%] md:w-[30%] lg:w-[24%]"
            >
              <img
                className="w-auto aspect-square h-250px"
                src={character?.image ?? "/placeholder.webp"}
                loading="lazy"
                alt={character.name ?? "resident"}
                height={250}
                width={250}
              />
              <span className="flex justify-start items-start gap-2">
                <h1 className="">{character.id}.</h1>
                <h1 className="">{character.name}</h1>
              </span>
                <span
                  data-tip={"status:" + character?.status}
                  className="flex  items-center gap-1 text-lg tooltip hover:tooltip-open tooltip-bottom"
                >
                  status:
                  <h3 className={`badge ${status_badge_styles()}`}>
                    {character?.status}
                  </h3>
                </span>
            </Link>
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
