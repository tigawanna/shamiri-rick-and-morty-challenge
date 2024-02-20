import { useFormHook } from "@/components/form/useForm";
import { hotToast } from "@/components/wrappers/toast";
import {
  ShamiriRickAndMortyNotesCreate,
  ShamiriRickAndMortyNotesUpdate,
} from "@/lib/pb/database";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { pageNumberParser } from "@/utils/helpers/others";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import {
  useMutation,
  usePageContext,
  useQuery,
  useQueryClient,
} from "rakkasjs";
import { useState } from "react";
import { and, eq } from "typed-pocketbase";

export function useUpsertCharacterNote({ note }: { note?: string }) {
  const { locals } = usePageContext();
  const [open, setOpen] = useState(false);
  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<{ note: string }>({
      initialValues: {
        note: note ?? "",
      },
    });
  const qc = useQueryClient();
  const create_note_mutation = useMutation(
    (data: ShamiriRickAndMortyNotesCreate) => {
      return tryCatchWrapper(
        locals.pb.collection("shamiri_rick_and_morty_notes").create(data),
      );
    },
    {
      invalidateTags: ["character_notes"],
      onSuccess(data) {
        if (data && data.data) {
          hotToast({
            title: "Note created",
            type: "success",
          });

          setInput({ note: "" });
          setOpen(false);
        }
        if (data && data.error) {
          hotToast({
            title: "Note creation failed",
            type: "error",
            description: data.error.message,
          });
        }
      },
      onError(error: any) {
        hotToast({
          title: "Note creation failed",
          type: "error",
          description: error.message,
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
      invalidateTags: ["character_notes"],
      onSuccess(data) {
        if (data && data.data) {
          hotToast({
            title: "Note updated",
            type: "success",
          });
          setInput({ note: "" });
          setOpen(false);
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
    open,
    setOpen,
    create_note_mutation,
    update_note_mutation,
    input,
    handleChange,
  };
}

interface UseCharacterNotesProps {
  character_id?: string;
}
export function useCharacterNotes({ character_id }: UseCharacterNotesProps) {
  const { search_param: page_no } = useCustomSearchParams({
    key: "pbnp",
    default_value: "1",
  });
  const page = pageNumberParser(page_no);
  const { locals } = usePageContext();
  const user_id = locals.pb.authStore.model?.id;
  const query_key = user_id
    ? `character_notes/${character_id}/${user_id}`
    : `character_notes/${character_id}`;
  
    const notes_filter = character_id
    ? locals.pb
        .from("shamiri_rick_and_morty_notes")
        .createFilter(
          and(
            eq("character_id", character_id ?? ""),
            eq("user.id", user_id ?? ""),
          ),
        )
    : locals.pb
        .from("shamiri_rick_and_morty_notes")
        .createFilter(eq("user.id", user_id ?? ""));



  console.log(" === query filer  ==== ", notes_filter);


  const query = useQuery(
    query_key,
    () => {
      return tryCatchWrapper(
        locals.pb.from("shamiri_rick_and_morty_notes").getList(page, 20, {
          sort: "-created",
          select: {
            expand: {
              user: true,
            },
          },
          filter: notes_filter?.toString(),
        }),
        // .getList(1, 20, {
        //   filter: notes_filter?.toString(),

        // }),
      );
    },
    {
      tags: ["character_notes"],
    },
  );

  return query;
}
