import { hotToast } from "@/components/wrappers/toast";
import {
  ShamiriRickAndMortyNotesCreate,
  ShamiriRickAndMortyNotesUpdate,
} from "@/lib/pb/database";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useMutation, usePageContext, useQuery } from "rakkasjs";
import { and, eq } from "typed-pocketbase";


export function useUpsertCharacterNote() {
  const { locals } = usePageContext();
  const create_note_mutation = useMutation(
    (data: ShamiriRickAndMortyNotesCreate) => {
      return tryCatchWrapper(
        locals.pb.collection("shamiri_rick_and_morty_notes").create(data),
      );
    },
    {
      onSuccess(data) {
        if (data && data.data) {
          hotToast({
            title: "Note created",
            type: "success",
          });
        }
        if (data && data.error) {
          hotToast({
            title: "Note creation failed",
            type: "error",
            description: data.error.message,
          });
        }
      },
      onError(error:any) {
        hotToast({
          title: "Note creation failed",
          type: "error",
          description:error.message,
        });
      },
    },
  );
  const update_note_mutation = useMutation(
    ({ id, data }: { id: string; data: ShamiriRickAndMortyNotesUpdate }) => {
      return tryCatchWrapper(
        locals.pb.collection("shamiri_rick_and_morty_notes").update(id, data),
      );
    },
    {
      onSuccess(data) {
        if (data && data.data) {
          hotToast({
            title: "Note updated",
            type: "success",
          });
        }
        if (data && data.error) {
          hotToast({
            title: "Note update failed",
            type: "error",
            description: data.error.message,
          });
        }
      },
      onError(error: any) {
        hotToast({
          title: "Note update failed",
          type: "error",
          description: error.message,
        });
      },
    },
  );

  return {
    create_note_mutation,
    update_note_mutation,
  };
}


interface UseCharacterNotesProps{
  user_id?:string|null|undefined;
  character_id:string;
}
export function useCharacterNotes({ character_id,user_id }: UseCharacterNotesProps) {
  const { locals } = usePageContext();
  const query_key = user_id
    ? `character_notes/${character_id}/${user_id}`
    : `character_notes/${character_id}`;
    const notes_filter = user_id?
    locals.pb.from("shamiri_rick_and_morty_notes")
      .createFilter(and(eq("character_id", character_id), eq("user.id", user_id))):
    locals.pb.from("shamiri_rick_and_morty_notes")
      .createFilter(eq("character_id", character_id))
      console.log(" === query filer  ==== ",notes_filter);
  const query  =useQuery(query_key, () => {
    return tryCatchWrapper(
      locals.pb.collection("shamiri_rick_and_morty_notes").getList(1, 20, {
        filter:notes_filter?.toString(),
      }),
    );
  });

  return query
  
}

