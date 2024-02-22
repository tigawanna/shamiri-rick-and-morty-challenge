import { GridSuspenseFallback } from "@/components/shared/GridSuspenseFallback";
import { CharacterNoteList } from "@/routes/components/shared/notes/CharacterNoteList";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Redirect, usePageContext, useQuery } from "rakkasjs";
import { Suspense } from "react";
import {
  ProfileInfo,
  ProfileInfoSuspenseFallback,
} from "../../components/ProfileInfo";

interface neProfileComponentProps {
  profile_id: string;
  is_viewer:boolean;
}

export function OneProfileComponent({ profile_id,is_viewer }: neProfileComponentProps) {
  const { locals } = usePageContext();
  const query = useQuery({
    tags: ["viewer"],
    queryKey: "profile/"+profile_id,
    queryFn: () => {
      return tryCatchWrapper(
        locals.pb.from("shamiri_users").getOne(profile_id, {}),
      );
    },
  });
  const profile = query?.data?.data;
  if (!profile) {
    return <Redirect href=".." />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <Suspense fallback={<ProfileInfoSuspenseFallback />}>
        <ProfileInfo profile={profile} />
      </Suspense>
      <Suspense fallback={<GridSuspenseFallback />}>
        <CharacterNoteList view="user" is_viewer={is_viewer} />
      </Suspense>
    </div>
  );
}
