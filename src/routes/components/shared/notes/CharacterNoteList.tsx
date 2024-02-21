import dayjs from "dayjs";
import { useCharacterNotes } from "./hooks";
import { ListPagination } from "@/components/shared/pagination/ReactresponsivePagination";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { CharachterNoteModal } from "./CharachterNoteModal";
import { Edit } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface CharacterNoteListProps {
  character_id?: string;
  view:"character"|"user"
}

export function CharacterNoteList({ character_id,view }: CharacterNoteListProps) {
  const query = useCharacterNotes({ character_id,view });
  const {
    data: { user },
  } = useViewer();
  const data = query.data?.data;
  if (query.data.error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ErrorOutput error={query.data.error} />
      </div>
    );
  }
  if ((!data || data?.items?.length === 0)&&character_id) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="">No notes found for this character</p>
      </div>
    );
  }
  if (!data || data?.items?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="">No notes left by this user</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-fit flex flex-col  overflow-auto gap-3">
      <ul className="flex flex-wrap justify-center w-full  gap-2 ">
        {data?.items?.map((note) => {
          const is_me_tw_styles =
            user?.username === note.expand?.user?.username
              ? " w-full flex justify-between items-center  p-1 bg-secondary/5"
              : "w-full flex justify-between items-center bg-base-200 p-1";
          return (
            <div
              key={note.id}
              className="flex flex-col jusiify-between rounded-lg bg-base-300
             gap-1 min-h-24 w-full sm:w-fit  min-w-[25%] max-w-[90%] relative"
            >
              <div className="absolute bottom-[2%] right-[2%]">
                {note.character_id &&
                  note.character_name &&
                  user?.username === note.expand?.user?.username && (
                    <CharachterNoteModal
                      character_id={note.character_id}
                      character_name={note.character_name}
                      note_id={note.id}
                      note={note.note}
                      icon={
                        <div className="">
                          <Edit className="h-4 w-4" />
                        </div>
                      }
                    />
                  )}
              </div>
              <div className={is_me_tw_styles}>
                <div className="text-sm">
                  @{note.expand?.user?.username}divi
                </div>
                <div className="text-xs">{dayjs(note.created).fromNow()}</div>
              </div>
              <p className="text-lg w-full p-2 h-full">{note.note}</p>
              <div className="flex flex-col"></div>
            </div>
          );
        })}
      </ul>
      <ListPagination
        query_key="pbnp"
        total_pages={query.data.data?.totalPages ?? 1}
      />
          <div className="w-full h-fit flex flex-col items-center  gap-2"></div>
    </div>
  );
}
