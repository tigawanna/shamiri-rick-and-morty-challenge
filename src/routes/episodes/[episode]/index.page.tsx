import { PageProps } from "rakkasjs"
import { OneEpisodeComponent } from "./components/OneEpisodeRouteComponent"
export default function OneEpisodePage({params}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    <OneEpisodeComponent id={params.episode}/>
</div>
)}
