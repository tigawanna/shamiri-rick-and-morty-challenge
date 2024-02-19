import { ShamiriUsersResponse } from "@/lib/pb/database";
import { EditUserProfile } from "./EditUserProfile";
import { ProfileEmailStatus } from "./ProfileEmailStatus";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface ProfileDetailsProps {
  profile: ShamiriUsersResponse;
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <div className="w-full flex flex-wrap items-center justify-center md:justify-between">
      <div className="flex gap-3 min-w-fit items-center justify-center">
        <h1 className="text-3xl font-bold">@{profile?.username}</h1>
          <EditUserProfile id={profile?.id} username={profile?.username} />
      </div>
      <div className="">
        <ProfileEmailStatus
          email={profile?.email}
          verified={profile?.verified}
        />

        <h1 className="">joined: {dayjs(profile?.created).fromNow()}</h1>
      </div>
    </div>
  );
}
