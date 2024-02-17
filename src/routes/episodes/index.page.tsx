import { useDebouncedSearchWithhParams } from "@/utils/hooks/search"
import { PageProps } from "rakkasjs"

export default function Page({}:PageProps) {
const {current,searchType,isDebouncing} = useDebouncedSearchWithhParams({
    default_search_query:"",
    default_search_type:"CHARACTER"
})
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    
</div>
)}
