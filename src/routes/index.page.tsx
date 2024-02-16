import { PageProps } from "rakkasjs";
import { Locations, LocationsSuspenseFallback } from "./components/Locations";
import { Suspense } from "react";
import { SearchComponent } from "./components/search/Searchcomponent";

export default function HomePage({ url }: PageProps) {
  return (
    <main className="  w-full flex flex-col gap-3 ">
    {/* <Suspense fallback={<LocationsSuspenseFallback />}>
        <Locations />
      </Suspense> */}
      <SearchComponent/>
    </main>
  );
}
