import { tryCatchWrapper } from "@/utils/helpers/async";
import { usePageContext, useQuery } from "rakkasjs";

interface ProfileCharcterNotesProps {
id:string
}

export function ProfileCharcterNotes({id}:ProfileCharcterNotesProps){
const{locals} = usePageContext()
useQuery(`character_notes/${id}`,()=>{
return tryCatchWrapper(
  locals.pb.collection("shamiri_rick_and_morty_notes").getList(1,20,{
    filter:`user = "${id}"`
  })
);
})
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>

 </div>
);
}
