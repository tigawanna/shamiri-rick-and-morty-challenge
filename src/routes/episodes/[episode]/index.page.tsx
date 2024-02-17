import { PageProps } from "rakkasjs"
import { OneEpisodeComponent } from "./components/OneEpisodesRouteList"
export default function Page({params}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    <OneEpisodeComponent id={params.episode}/>
</div>
)}
