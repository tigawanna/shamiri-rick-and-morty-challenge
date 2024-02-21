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
    <div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-between gap-1">
      
      <div className="w-full  h-full flex flex-col sm:flex-row gap-4  items-center justify-between p-2 bg-base-200 rounded-lg">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <h1 className="text-lg md:text-3xl font-bold line-clamp-1">@{profile?.username}</h1>
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

      <img
        className="w-full max-w-[300px] h-auto max-h-[200px] sm:max-h-auto sm:w-auto sm:h-full aspect-square object-cover"
        src={profile?.avatarUrl ?? "/placeholder.webp"}
        loading="lazy"
        alt={profile?.username ?? "user profile"}
        height={"200px"}
        width={"200px"}
      />
    </div>
  );
}
