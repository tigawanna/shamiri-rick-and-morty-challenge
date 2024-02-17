import { PageProps } from "rakkasjs"
import { OneLocationRouteComponent } from "./components/OneLocationRouteComponent"
export default function OneLocationPage({
    params
}:PageProps) {
    const location_params = params.location
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
<OneLocationRouteComponent id={location_params}/>
</div>
)}
