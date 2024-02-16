import { Suspense, useTransition } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { Link } from "rakkasjs";
import { SearchType } from "./types";


interface SearchListProps {
  searchvalue: string;
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
}

export function SearchList({
  searchType,
  searchvalue,
  setSearchType,
}: SearchListProps) {
  const [, startTransition] = useTransition();

  return (
    <div className="w-full h-full flex  overflow-auto">
      <Tabs
        value={searchType}
        onValueChange={(e) =>
          startTransition(() => setSearchType(e as SearchType))
        }
        className="w-full h-full "
      >
        <TabsList className="grid w-full grid-cols-3 sticky top-0 z-50">
          <TabsTrigger value="LOCATION">Loaction name</TabsTrigger>
          <TabsTrigger value="CHARACTER">Character name</TabsTrigger>
          <TabsTrigger value="EPISODE">Episode name</TabsTrigger>
        </TabsList>

        <TabsContent value="LOCATION" className="z-30">
          Search results by location name
        </TabsContent>
        <TabsContent value="CHARACTER" className="z-30">
          Search results by character name
        </TabsContent>
        <TabsContent value="EPISODE" className="z-30">
          Search results by episode name
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function SearchListSuspenseFalllback({}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {Array.from({ length: 12 }).map((_, index) => {
        return (
          <div key={index} className="h-32 bg-base-300 skeleton">
            <div className="h-10 w-full bg-base-100 animate-pulse"></div>
            <div className="h-7 w-full bg-base-100 animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
}

export function SearchInputNoItems() {
  return (
    <div className="w-full min-h-[50vh] h-full flex justify-center items-center  rounded-lg ">
      <div className="flex flex-col items-center justify-center gap-2 bg-base-200 rounded-lg p-5 ">
        <p> No results found, try some keywords </p>
        <> ---- or ----- </>
        <Link
          href="/viewer"
          className="text-secondary hover:text-accent text-xl font-bold"
        >
          View your profile
        </Link>{" "}
      </div>
    </div>
  );
}
