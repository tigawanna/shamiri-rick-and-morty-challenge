import { PageProps } from "rakkasjs";

import { CharacterNoteList } from "../components/shared/notes/CharacterNoteList";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { Suspense } from "react";
import { GridSuspenseFallback } from "@/components/shared/GridSuspenseFallback";
import { ProfileInfo } from "./components/ProfileInfo";

export default function ProfilePage({}: PageProps) {
const{data:{user}}=useViewer()

  const profile = user!;
  return (
    <div className="w-full h-full min-h-fit  flex flex-col  gap-5 px-1">
      <ProfileInfo profile={profile} />
      <Suspense fallback={<GridSuspenseFallback/>}>
        <CharacterNoteList view="user"/>
      </Suspense>
    </div>
  );
}
