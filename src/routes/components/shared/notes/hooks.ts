import { useFormHook } from "@/components/form/useForm";
import { hotToast } from "@/components/wrappers/toast";
import {
  ShamiriRickAndMortyNotesCreate,
  ShamiriRickAndMortyNotesResponse,
  ShamiriRickAndMortyNotesUpdate,
  ShamiriUsersResponse,
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
import { TypedRecord, and, eq, neq } from "typed-pocketbase";

export type UseCreateCharacterNote = {
  action: "create";
  note: ShamiriRickAndMortyNotesCreate;
};
export type UseUpdateCharacterNote = {
  action: "update";
  note: ShamiriRickAndMortyNotesUpdate & { id: string };
};

export type CreateOrDeletNote = UseCreateCharacterNote | UseUpdateCharacterNote;
export function useUpsertCharacterNote({ action, note }: CreateOrDeletNote) {
  const { locals } = usePageContext();
  const [open, setOpen] = useState(false);

  const { handleChange, input, setInput } = useFormHook<{
    note: string;
    status: "visible" | "hidden";
  }>({
    initialValues: {
      note: note?.note ?? "",
      status: note?.status ?? "visible",
    },
  });

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

          setInput((prev) => {
            return {
              ...prev,
              note: "",
            };
          });
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
    ({ id, data }: { id: string; data?: ShamiriRickAndMortyNotesUpdate }) => {
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
          setInput((prev) => {
            return {
              ...prev,
              note: "",
            };
          });
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
    setInput,
  };
}

interface UseCharacterNotesProps {
  character_id?: string;
  profile_viewer_id?: string;
  view: "character" | "user";
  is_viewer: boolean;
}
export function useCharacterNotes({
  character_id,
  profile_viewer_id,
  view,
  is_viewer,
}: UseCharacterNotesProps) {
  const { search_param: page_no } = useCustomSearchParams({
    key: "pbnp",
    default_value: "1",
  });
  const page = pageNumberParser(page_no);
  const { locals } = usePageContext();
  const user_id = locals.pb.authStore.model?.id;
  function genQueryKey({ character_id, user_id,profile_viewer_id }: { character_id?: string; user_id?: string; profile_viewer_id?: string }) {
    if(view === "user" && profile_viewer_id && !is_viewer){
      return `character_notes/${profile_viewer_id}`;
    }
    if(view === "user" && is_viewer){
      return `character_notes/${user_id}`;
    }
   return `character_notes/${character_id}`;
  } 
  const query_key = genQueryKey({ character_id, user_id,profile_viewer_id })

  function generateQueryFilters({
    character_id,
    user_id,
  }: {
    character_id?: string;
    user_id?: string;
  }) {
    if (view === "user" && profile_viewer_id && !is_viewer) {
      return locals.pb
        .from("shamiri_rick_and_morty_notes")
        .createFilter(
          and(eq("user.id", profile_viewer_id ?? ""), neq("status", "hidden")),
        );
    }
    if (view === "user" && is_viewer) {
      return locals.pb
        .from("shamiri_rick_and_morty_notes")
        .createFilter(eq("user.id", user_id ?? ""));
    }

    if (view === "character") {
      return locals.pb
        .from("shamiri_rick_and_morty_notes")
        .createFilter(
          and(eq("character_id", character_id ?? ""), neq("status", "hidden")),
        );
    }

    return "";
  }
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
          filter: generateQueryFilters({ character_id, user_id })?.toString(),
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
