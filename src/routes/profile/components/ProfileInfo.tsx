import { ShamiriUsersResponse } from "@/lib/pb/database";
import { EditUserProfile } from "./EditUserProfile";
import { ProfileEmailStatus } from "./ProfileEmailStatus";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useViewer } from "@/lib/pb/hooks/useViewer";
dayjs.extend(relativeTime);

interface ProfileInfoProps {
  profile: ShamiriUsersResponse;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const{data}= useViewer()
  const current_user_id = data?.user?.id
  return (
    <div className="w-full flex min-h-[200px] h-full flex-col-reverse sm:flex-row items-center justify-center md:justify-between gap-1">
      <div className="w-full  h-full flex flex-col sm:flex-row gap-4  items-center justify-between p-2 bg-base-200 rounded-lg">
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <h1 className="text-lg md:text-3xl font-bold line-clamp-1">
            @{profile?.username}
          </h1>
          {current_user_id === profile?.id && 
          <EditUserProfile 
          id={profile?.id} 
          username={profile?.username} 
          avatarUrl={profile?.avatarUrl} />}
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
        src={(profile?.avatarUrl&&profile.avatarUrl.length>0)?profile.avatarUrl:"/placeholder.webp"}
        loading="lazy"
        alt={profile?.username ?? "user profile"}
        height={"200px"}
        width={"200px"}
      />
    </div>
  );
}

export function ProfileInfoSuspenseFallback() {
  return (
    <div className="w-full h-full  flex flex-col sm:flex-row items-center  ">
      <div className="w-full min-h-[200px]  flex flex-col gap-3  items-center  justify-center p-2  rounded-lg">
        <h1 className=" h-10 min-w-[40%]  bg-base-300 skeleton rounded-xl "></h1>
        <h1 className="h-5 bg-base-300 skeleton min-w-[70%]"></h1>
        <h1 className="h-5 bg-base-300 skeleton min-w-[60%]"></h1>
      </div>

      <div className="min-h-[200px]  aspect-square object-cover bg-base-300 skeleton" />
    </div>
  );
}
