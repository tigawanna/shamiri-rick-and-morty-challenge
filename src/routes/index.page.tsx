import { PageProps } from "rakkasjs";
import { Locations, LocationsSuspenseFallback } from "./components/Locations";
import { Suspense } from "react";

export default function HomePage({ url }: PageProps) {
  return (
    <main className="  w-full flex flex-col gap-3 ">
      <LocationsSuspenseFallback />
      <Suspense fallback={<LocationsSuspenseFallback />}>
        <Locations />
      </Suspense>
    </main>
  );
}
