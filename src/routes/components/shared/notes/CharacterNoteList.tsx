import dayjs from "dayjs";
import { useCharacterNotes } from "./hooks";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { useViewer } from "@/lib/pb/hooks/useViewer";

interface CharacterNoteListProps {
  character_id: string;
}

export function CharacterNoteList({ character_id }: CharacterNoteListProps) {
  const query = useCharacterNotes({ character_id });
  const {data:{user}} = useViewer()
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
    <div className="w-full h-full flex flex-col items-center justify-center overflow-auto">
      <ul className="flex flex-wrap justify-center w-full gap-2 pb-5">
        {data?.items?.map((note) => {
          const is_me_tw_styles =
            user?.username === note.expand?.user?.username
              ? " w-full flex justify-between items-center  p-1 bg-secondary/5"
              : "w-full flex justify-between items-center bg-base-200 p-1";
          return (
            <div
              key={note.id}
              className="flex flex-col items-center jusiify rounded-lg bg-base-300
             gap-1 w-fit min-w-[25%] max-w-[90%] "
            >
              <p className="text-lg w-full p-2">{note.note}</p>
              <div className={is_me_tw_styles}>
                <div className="text-sm">@{note.expand?.user?.username}div</div>
                <div className="text-xs">
                  {dayjs(note.created).format("DD-MM-YYYY")}
                </div>
              </div>
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
