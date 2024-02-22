import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { CreateOrDeletNote, useUpsertCharacterNote } from "./hooks";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { Loader } from "lucide-react";
import { Link, useLocation } from "rakkasjs";
import { ProfileEmailStatus } from "@/routes/profile/components/ProfileEmailStatus";

import {

  ShamiriUsersResponse,
} from "@/lib/pb/database";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface CharachterNoteModalProps {
  icon: React.ReactNode;
  data: CreateOrDeletNote;
  viewer: ShamiriUsersResponse | null;
}

export function CharachterNoteModal({ icon, data,viewer }: CharachterNoteModalProps) {
  const { action, note } = data;
  const { current } = useLocation();

  const {
    open,
    setOpen,
    create_note_mutation,
    update_note_mutation,
    input,
    handleChange,
    setInput,
  } = useUpsertCharacterNote(data);
  // console.log(" ===  input  ===== ",input)
  if (!viewer) {
    const auth_url = new URL("/auth", current.origin);
    auth_url.searchParams.set("return_to", current.pathname);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{icon}</DialogTrigger>
        <DialogContent className="sm:max-w-[625px] justify-center items-center">
          <Link
            className="btn btn-sm btn-wide btn-secondary"
            href={auth_url.toString()}
          >
            Login to add notes
          </Link>
        </DialogContent>
      </Dialog>
    );
  }
  if (viewer && !viewer?.verified) {
    const auth_url = new URL(current.origin + "/profile");
    auth_url.searchParams.set("return_to", current.pathname);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{icon}</DialogTrigger>
        <DialogContent className="sm:max-w-[625px] justify-center items-center gap-3">
          <DialogHeader>
            <DialogTitle>Please verify your email</DialogTitle>
          </DialogHeader>
          <div className="btn btn-wide">
            <ProfileEmailStatus email={viewer.email} verified={viewer.verified} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{icon}</DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {action === "update" ? "Edit Note" : "Add Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <PbTheTextAreaInput
            field_key={"note"}
            field_name="Note"
            required
            value={input?.note}
            onChange={handleChange}
            // @ts-expect-error
            pb_error={
              create_note_mutation.data?.error ||
              update_note_mutation.data?.error
            }
          />
          <Select
            defaultValue={input?.status}
            onValueChange={(e: "visible" | "hidden") => {
              setInput((prev) => {
                return { ...prev, status: e };
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="visible">visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="flex items-center justify-center gap-2">
          {action === "update" && note && (
            <Button
              type="button"
              className="flex gap-2 items-center justify-center"
              disabled={update_note_mutation.isLoading}
              onClick={() => update_note_mutation.mutate({
                id: note.id,
                data: {
                  note: input?.note,
                  status: input?.status ?? "visible",
                }
              })}
            >
              Update
              {update_note_mutation.isLoading && (
                <Loader className="animate-spin" />
              )}
            </Button>
          )}

          {action === "create" && viewer?.id  &&  (
            <Button
              type="button"
              className="flex gap-2 items-center justify-center"
              disabled={create_note_mutation.isLoading}
              onClick={() =>
                create_note_mutation.mutate({
                  note: input?.note ?? "",
                  character_id:data.note.character_id,
                  character_name:data.note.character_name,
                  status: input?.status ?? "visible",
                  user: viewer?.id,
                })
              }
            >
              Save changes
              {create_note_mutation.isLoading && (
                <Loader className="animate-spin" />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
