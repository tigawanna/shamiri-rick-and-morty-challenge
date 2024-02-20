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
import { ShamiriRickAndMortyNotesUpdate } from "@/lib/pb/database";
import { useUpsertCharacterNote } from "./hooks";

interface CharachterNoteModalProps {
  user_id: string;
  note_id?: string;
  note?: string;
  character_id: string;
  character_name: string;
  icon: React.ReactNode;
}

export function CharachterNoteModal({
  user_id,
  note_id,
  note,
  character_id,
  character_name,
  icon,
}: CharachterNoteModalProps) {
  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<{ note: string }>({
      initialValues: {
        note: note ?? "",
      },
    });
  const { create_note_mutation, update_note_mutation } =
    useUpsertCharacterNote();
  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{note_id ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Textarea
              id="note"
              value={input?.note}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {note_id && note ? (
            <Button
              type="button"
              onClick={() =>
                update_note_mutation.mutate({
                  id: note_id,
                  data: input,
                })
              }
            >
              Update
            </Button>
          ) : (
            <Button
              type="button"
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
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
