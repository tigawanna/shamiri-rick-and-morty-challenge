import { ShamiriUsersResponse } from "@/lib/pb/database";
import { PageProps, usePageContext, useQuery } from "rakkasjs";
import { ProfileDetails } from "./components/ProfileDetails";
import { CharacterNoteList } from "../components/shared/notes/CharacterNoteList";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { Suspense } from "react";
import { GridSuspenseFallback } from "@/components/shared/GridSuspenseFallback";

export default function ProfilePage({}: PageProps) {
const{data:{user}}=useViewer()

  const profile = user!;
  return (
    <div className="w-full h-full  flex flex-col  gap-3">
      <ProfileDetails profile={profile} />
      <Suspense fallback={<GridSuspenseFallback/>}>
        <CharacterNoteList view="user"/>
      </Suspense>
    </div>
  );
}
