import { useCharacterNotes } from "./hooks";

interface CharacterNoteListProps {
character_id:string
user_id?:string|null|undefined
}

export function CharacterNoteList({character_id,user_id}:CharacterNoteListProps){
const query = useCharacterNotes({character_id,user_id})
const data = query.data?.data
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    {data?.items?.length === 0 ? (
      <p className="text-secondary/50">No notes found for this character</p>
    ) : (
      <p className="text-secondary/50">No notes found for this character</p>
    )}
    <ul className="flex flex-wrap justify-center w-full gap-2 pb-5">
      {data?.items?.map((note) => {
        return (
          <div
             key={note.id}
            className="flex flex-col items-center p-2 rounded-lg bg-base-300
             gap-1 w-[90%] sm:w-[40%] md:w-[30%] lg:w-[24%] xl:w-[19%]"
          >
            <p>{note.note}</p>
          </div>
        );
      })}
    </ul>
  </div>
);
}
