import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useUpsertCharacterNote } from "./hooks";
import { useViewer } from "@/lib/pb/hooks/useViewer";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { Loader } from "lucide-react";
import { Link, useLocation } from "rakkasjs";
import { ProfileEmailStatus } from "@/routes/profile/components/ProfileEmailStatus";
import { TypedRecord } from "typed-pocketbase";
import {
  ShamiriRickAndMortyNotesResponse,
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
  character_id: string;
  character_name: string;
  icon: React.ReactNode;
  note?: TypedRecord<ShamiriRickAndMortyNotesResponse, ShamiriUsersResponse>;
}

export function CharachterNoteModal({
  icon,
  note,
  character_id,
  character_name,
}: CharachterNoteModalProps) {
  const {
    data: { user },
  } = useViewer();
  const user_id = user?.id!;
  const { current } = useLocation();
  const note_id = note?.id;

  const {
    open,
    setOpen,
    create_note_mutation,
    update_note_mutation,
    input,
    handleChange,
    setInput,
  } = useUpsertCharacterNote({
    note: note
      ? note
      : {
          character_name,
          note: "",
          character_id,
        },
  });

  if (!user) {
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
  if (user && !user?.verified) {
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
            <ProfileEmailStatus email={user.email} verified={user.verified} />
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
          <DialogTitle>{note_id ? "Edit Note" : "Add Note"}</DialogTitle>
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
                  character_id: note?.character_id!,
                  character_name: note?.character_name!,
                  note: input?.note!,
                  user: user_id,
                  status: "visible",
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
