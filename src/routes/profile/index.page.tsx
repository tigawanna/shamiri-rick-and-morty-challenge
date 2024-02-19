import { ShamiriUsersResponse } from "@/lib/pb/database";
import { PageProps, usePageContext, useQuery } from "rakkasjs";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function ProfilePage({}: PageProps) {
  const { locals } = usePageContext();
  const query = useQuery("viewer", () => {
    return locals.pb.authStore?.model as { viewer: ShamiriUsersResponse };
  });

  const profile = query.data.viewer;
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{profile?.username}</h1>
      <h1 className="text-xl font-bold">{profile?.email}</h1>
      <h1 className="text-xl font-bold">{profile?.verified}</h1>
      <h1 className="text-xl font-bold">{dayjs(profile?.created).fromNow()}</h1>
    </div>
  );
}
