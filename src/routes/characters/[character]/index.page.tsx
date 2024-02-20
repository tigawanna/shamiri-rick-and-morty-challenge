import { PageProps } from "rakkasjs";
import { OneCharacterComponent } from "./components/OneCharacterRouteComponent";
import { CharacterNoteList } from "@/routes/components/shared/notes/CharacterNoteList";
import { GridSuspenseFallback } from "@/components/shared/GridSuspenseFallback";
import { Suspense } from "react";
export default function OneCharacterPage({ params }: PageProps) {
  const one_character = params?.character;
  return (
    <div className="w-full h-full  flex flex-col  items-center justify-center gap-5">
      <OneCharacterComponent id={one_character} />
      <Suspense fallback={<GridSuspenseFallback />}>
        <CharacterNoteList character_id={one_character} />
      </Suspense>
    </div>
  );
}
