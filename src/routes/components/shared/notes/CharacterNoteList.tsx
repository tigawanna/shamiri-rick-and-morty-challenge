import dayjs from "dayjs";
import { useCharacterNotes } from "./hooks";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";

interface CharacterNoteListProps {
  character_id: string;
  user_id?: string | null | undefined;
}

export function CharacterNoteList({
  character_id,
  user_id,
}: CharacterNoteListProps) {
  const query = useCharacterNotes({ character_id, user_id });
  const data = query.data?.data;
  if (query.data.error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ErrorOutput error={query.data.error} />
      </div>
    );
  }
  if (!data || data?.items?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="">No notes found for this character</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">

      <ul className="flex flex-wrap justify-center w-full gap-2 pb-5">
        {data?.items?.map((note) => {
          return (
            <div
              key={note.id}
              className="flex flex-col items-center p-2 rounded-lg bg-base-300
             gap-1 w-[90%] sm:w-[40%] md:w-[30%] lg:w-[24%] xl:w-[19%]"
            >
              <p>{note.note}</p>
              <div>@{note.expand?.user?.username}</div>
              <div>{dayjs(note.created).format("DD-MM-YYYY")}</div>
            </div>
          );
        })}
      </ul>
      <ListPagination
        query_key="pbnp"
        total_pages={query.data.data?.totalPages ?? 1}
      />
    </div>
  );
}
