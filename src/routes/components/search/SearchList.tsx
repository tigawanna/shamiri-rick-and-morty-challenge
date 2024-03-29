import { useTransition } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { SearchType } from "./types";
import { graphql, useLazyLoadQuery } from "@/lib/relay/modules";
import { SearchListLocationsQuery } from "./__generated__/SearchListLocationsQuery.graphql";
import { Locations } from "./search_location/Locations";
import { CharacterLocations } from "./search_location/CharacterLocations";
import { EpisodeLocations } from "./search_location/EpisodeLocations";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { pageNumberParser } from "@/utils/helpers/others";

interface SearchListProps {
  searchvalue: string;
  searchType?: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType | undefined>>;
}

export function SearchList({
  searchType,
  searchvalue,
  setSearchType,
}: SearchListProps) {
  const [, startTransition] = useTransition();
  const getTabPageKey = (searchType?: SearchType) => {
    switch (searchType) {
      case "LOCATION":
        return "slp";
        break;
      case "CHARACTER":
        return "scp";
        break;
      case "EPISODE":
        return "sep";
        break;
      default:
        return "slp";
    }
  };
  const { search_param: page_no } = useCustomSearchParams({
    key: getTabPageKey(searchType),
    default_value: "1",
  });

  const pageNo = pageNumberParser(page_no);
  // console.log("  ==========  pNo ======== ", pageNo)
  const query = useLazyLoadQuery<SearchListLocationsQuery>(
    searchLocationsQuery,
    { name: searchvalue, page: pageNo },
  );
  // console.log(" ====== query ===== ", query)
  const location_locations = query?.locations?.results ?? [];
  const character_locations =
    query?.characters?.results?.flatMap((c) => c?.location) ?? [];
  const episode_locations =
    query?.episodes?.results
      ?.flatMap((e) => e?.characters)
      .flatMap((c) => c?.location) ?? [];

  return (
    <div className="w-full h-full flex  overflow-auto">
      <Tabs
        value={searchType}
        onValueChange={(e) =>
          startTransition(() => setSearchType(e as SearchType))
        }
        className="w-full h-full "
      >
        <TabsList className="grid w-full sm:grid-cols-3 sticky top-0 z-50">
          <TabsTrigger value="LOCATION" >
            Location name {location_locations.length}
          </TabsTrigger>
          <TabsTrigger value="CHARACTER" >
            Character name {character_locations.length}
          </TabsTrigger>
          <TabsTrigger value="EPISODE" >
            Episode name {episode_locations.length}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="LOCATION" className="z-30">
          <Locations locations={query.locations} />
        </TabsContent>
        <TabsContent value="CHARACTER" className="z-30">
          <CharacterLocations characters={query.characters} />
        </TabsContent>
        <TabsContent value="EPISODE" className="z-30">
          <EpisodeLocations episodes={query.episodes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SearchListSuspenseFalllback({}) {
  return (
    <div className="w-full h-full flex flex-col items-center  gap-4">
      <div className="flex w-full gap-5  rounded-xl *:p-4 bg-secondary/5 p-3">
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg"></div>
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg "></div>
        <div className="w-full h-5 bg-base-300 skeleton rounded-lg "></div>
      </div>
      <ul className="flex flex-wrap gap-4 justify-center w-full p-3">
        {Array.from({ length:16 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-2 rounded-xl bg-base-300
            gap-2 px-3 py-2 h-44 w-[80%] sm:w-[40%] md:w-[30%]  min-w-[20%] flex-grow skeleton"
            ></div>
          );
        })}
      </ul>
    </div>
  );
}

export function SearchInputNoItems() {
  return (
    <div className="w-full min-h-[50vh] h-full flex justify-center items-center  rounded-lg ">
      <div className="flex flex-col items-center justify-center gap-2 bg-base-200 rounded-lg p-5 ">
        <p> No results found</p>
    </div>
    </div>
  );
}

export const searchLocationsQuery = graphql`
  query SearchListLocationsQuery($name: String!, $page: Int) {
    # start of query
    #  start of locations query
    locations(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        type
 
      }
    }
    #  end of locations query

    # start of characters query
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
        location {
          id
          name
          type

        }
      }
    }
    # end of characters query

    # start of episodes query

    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        created
        air_date
        characters {
          location {
            id
            name
            type
          }
        }
      }
    }
    # end of episodes query

    #  end of query
  }
`;
