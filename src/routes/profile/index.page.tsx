import { ShamiriUsersResponse } from "@/lib/pb/database";
import { PageProps, usePageContext, useQuery } from "rakkasjs";
import { ProfileDetails } from "./components/ProfileDetails";

export default function ProfilePage({}: PageProps) {
  const { locals } = usePageContext();
  const query = useQuery("viewer", () => {
    return locals.pb.authStore?.model as { viewer: ShamiriUsersResponse };
  });

  const profile = query.data.viewer;
  return (
    <div className="w-full h-full  flex flex-col  gap-2">
      <ProfileDetails profile={profile} />
    </div>
  );
}
