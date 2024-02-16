import { SearchListLocationsQuery, SearchListLocationsQuery$data } from "../search/__generated__/SearchListLocationsQuery.graphql";
type EpisodesResponse =SearchListLocationsQuery$data["episodes"]



interface EpisodeLocationsProps {
  episodes: EpisodesResponse | undefined;
}

export function EpisodeLocations({episodes}: EpisodeLocationsProps) {

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Episodes</h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center"></div>
      <ul className="w-full flex flex-wrap">

      </ul>
    </div>
  );
}

export function EpisodeLocationsResidents({ episodes }: EpisodeLocationsProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

    </div>
  );
}
