import { ShamiriUsersResponse } from "@/lib/pb/database";
import { PageProps, usePageContext, useQuery } from "rakkasjs";
import { ProfileDetails } from "./components/ProfileDetails";
import { CharacterNoteList } from "../components/shared/notes/CharacterNoteList";
import { useViewer } from "@/lib/pb/hooks/useViewer";

export default function ProfilePage({}: PageProps) {
const{data:{user}}=useViewer()

  const profile = user!;
  return (
    <div className="w-full h-full  flex flex-col  gap-2">
      <ProfileDetails profile={profile} />
      <CharacterNoteList/>
    </div>
  );
}
