import { PageProps } from "rakkasjs"
import { SearchListSuspenseFalllback } from "../components/search/SearchList"
export default function TestPage({}:PageProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
    <SearchListSuspenseFalllback/>
</div>
)}
