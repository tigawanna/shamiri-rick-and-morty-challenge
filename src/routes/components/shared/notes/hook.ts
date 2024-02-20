import { hotToast } from "@/components/wrappers/toast";
import {
  ShamiriRickAndMortyNotesCreate,
  ShamiriRickAndMortyNotesUpdate,
} from "@/lib/pb/database";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useMutation, usePageContext } from "rakkasjs";


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
