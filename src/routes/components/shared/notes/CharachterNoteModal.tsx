import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";

import { useUpsertCharacterNote } from "./hooks";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { useState } from "react";
import { Loader } from "lucide-react";

interface CharachterNoteModalProps {
  note_id?: string;
  note?: string;
  character_id: string;
  character_name: string;
  icon: React.ReactNode;
}

export function CharachterNoteModal({
  note_id,
  note,
  character_id,
  character_name,
  icon,
}: CharachterNoteModalProps) {
  const {data:{user}}= useViewer()
  const user_id = user?.id!



  const { open,setOpen,create_note_mutation, update_note_mutation,input,handleChange } =
    useUpsertCharacterNote({note});
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{note_id ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <PbTheTextAreaInput
            field_key={"note"}
            field_name="Note"
            required
            value={input.note}
            onChange={handleChange}
            // @ts-expect-error
            pb_error={
              create_note_mutation.data?.error ||
              update_note_mutation.data?.error
            }
          />
        </div>
        <DialogFooter className="flex items-center justify-center gap-2">
          {note_id && note ? (
            <Button
              type="button"
              className="flex gap-2 items-center justify-center"
              disabled={update_note_mutation.isLoading}
              onClick={() =>
                update_note_mutation.mutate({
                  id: note_id,
                  data: input,
                })
              }
            >
              Update
              {update_note_mutation.isLoading && (
                <Loader className="animate-spin" />
              )}
            </Button>
          ) : (
            <Button
              type="button"
              className="flex gap-2 items-center justify-center"
              disabled={create_note_mutation.isLoading}
              onClick={() =>
                create_note_mutation.mutate({
                  character_id,
                  character_name,
                  note: input?.note,
                  user: user_id,
                })
              }
            >
              Save changes
              {create_note_mutation.isLoading && (
                <Loader className="animate-spin" />
              )}
            </Button>
          )}
          {(create_note_mutation.isLoading ||
            update_note_mutation.isLoading) && (
            <Loader className="animate-spin" />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
