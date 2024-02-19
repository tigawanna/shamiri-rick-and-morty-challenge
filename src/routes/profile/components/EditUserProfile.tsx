import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { hotToast } from "@/components/wrappers/toast";
import { updateUser } from "@/lib/pb/auth";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { ShamiriUsersUpdate } from "@/lib/pb/database";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Edit, Loader } from "lucide-react";
import { useMutation, usePageContext, useQueryClient } from "rakkasjs";


interface EditUserProfileProps {
  id: string;
  username: string;
}

export function EditUserProfile({ id, username }: EditUserProfileProps) {
  const { locals } = usePageContext();
  const qc = useQueryClient();

  const { handleChange, input, error, setError, setInput, validateInputs } =
    useFormHook<ShamiriUsersUpdate>({
      initialValues: {
        username
      },
    });
  const update_user_mutation = useMutation((data: ShamiriUsersUpdate) => {
    return tryCatchWrapper(
      updateUser({
        pb: locals.pb,
        collection: "shamiri_users",
        id,
        data,
      }),
    );
  }, {
    onSuccess(data) {
      if (data && data?.data) {
        qc.invalidateQueries(["viewer"]);
        hotToast({
          type: "success",
          title: "Username updated",
        });
      }
      if (data && data?.error) {
        setError(data.error);
        hotToast({
          type: "error",
          title: "Something went wrong",
          description: data?.error?.message,
        });
      }
    },
    onError(error:any) {
      hotToast({
        type: "error",
        title: "Something went wrong",
        description: error?.message,
      });
    },
  });
  return (

      <Dialog>
        <DialogTrigger asChild>
          <Edit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form
            className="w-full h-full flex flex-col items-center justify-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              update_user_mutation.mutate({ username: input.username });
            }}
          >
            <PbTheTextInput
              field_key={"username"}
              field_name="Username"
              required
              val={input.username}
              onChange={handleChange}
              validation_error={error}
              // @ts-expect-error
              pb_error={update_user_mutation.data?.error}
            />
          <DialogFooter className="flex gap-2 justify-center items-center">
            <Button type="submit">Save changes</Button>
            {update_user_mutation.isLoading&&<Loader className="animate-spin"/>}
          </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>

  );
}
