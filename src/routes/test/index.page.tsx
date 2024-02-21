import { PageProps } from "rakkasjs"
import { SearchListSuspenseFalllback } from "../components/search/SearchList"
import { ProfileInfoSuspenseFallback } from "../profile/components/ProfileInfo"
export default function TestPage({}:PageProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
    <ProfileInfoSuspenseFallback/>
    {/* <SearchListSuspenseFalllback/> */}
</div>
)}
