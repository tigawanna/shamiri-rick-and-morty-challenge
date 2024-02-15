import { PageProps } from "rakkasjs";
import { Locations } from "./components/Locations";
import { Suspense } from "react";

export default function HomePage({ url }: PageProps) {
  return (
    <main className="  w-full flex flex-col gap-3 ">
      main page
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            Loading ...
          </div>
        }
      >
        <Locations />
      </Suspense>
    </main>
  );
}
