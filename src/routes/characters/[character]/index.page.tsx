import { PageProps } from "rakkasjs";
import { OneCharacterComponent } from "./components/OneCharacterRouteComponent";
import { CharacterNoteList } from "@/routes/components/shared/notes/CharacterNoteList";
export default function OneCharacterPage({ params }: PageProps) {
  const one_character = params.character;
  return (
    <div className="w-full h-full  flex flex-col  items-center justify-center">
      <OneCharacterComponent id={one_character} />

      <CharacterNoteList character_id={one_character} />
    </div>
  );
}
