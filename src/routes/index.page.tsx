import { PageProps } from "rakkasjs";
import { Suspense } from "react";
import { SearchComponent } from "./components/search/Searchcomponent";
import { SearchListSuspenseFalllback } from "./components/search/SearchList";

export default function HomePage({ url }: PageProps) {
  return (
    <main className="  w-full flex flex-col gap-3 ">
      <Suspense fallback={<SearchListSuspenseFalllback />}>
        <SearchComponent />
      </Suspense>
    </main>
  );
}
