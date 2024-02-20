import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  useQueryClient,
  useMutation,
  useLocation,
  usePageContext,
  navigate,
} from "rakkasjs";
import { Loader } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import { hotToast } from "@/components/wrappers/toast";
import { useViewer } from "@/lib/pb/hooks/useViewer";

interface MiniSettingsModalProps {}

export function MiniSettingsModal({}: MiniSettingsModalProps) {
  const qc = useQueryClient();
  const { current } = useLocation();
  const { locals } = usePageContext();
  const query = useViewer();
  const mutation = useMutation(
    async () => {
      try {
        await locals.pb.authStore.clear();
        return { success: true, error: null };
      } catch (error: any) {
        // console.log("======== error loggin out of db ======= ", error);
        return { success: false, error: error.message };
      }
    },
    {
      onSuccess(data) {
        if (data) {
          if (data.error) {
            hotToast({
              title: "Something went wrong",
              description: data.error,
              type: "error",
            });
          }
          if (data.success) {
            hotToast({
              title: "Logged out",
              type: "success",
            });
            qc.invalidateQueries(["viewer"]);
            const new_url = new URL(current);
            new_url.pathname = "/auth";
            new_url.searchParams.set("return_to", current.pathname);
            navigate(new_url.toString());
            //  return <Redirect href={new_url.toString()} />;
          }
        }
      },
    },
  );
  const viewer = query.data.user


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-7 w-7 rounded-full">
          <Avatar className="h-8 w-8">
            {/*  */}
            <AvatarImage src={viewer?.avatarUrl} alt="viewer" />
            {viewer ? (
              <AvatarFallback>{viewer?.username?.slice(0, 2)}</AvatarFallback>
            ) : (
              <AvatarFallback>{"n/a"}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {viewer ? (
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel className="font-bold text-xl">
            Profile
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <div className="flex flex-col gap-1 p-3">
            <div className="flex flex-col gap-1 p-3">
              <div>@{viewer?.username}</div>
              <div>{viewer?.email}</div>
         
            </div>

            <Button
              type="button"
              onClick={() => mutation.mutateAsync()}
              disabled={mutation.isLoading}
              variant={"outline"}
              className="flex justify-center items-center gap-2"
            >
              Logout{" "}
              {mutation.isLoading && (
                <Loader className="w-4 h-4 animate-spin" />
              )}
            </Button>
          </div>
          <DropdownMenuSeparator />
          <ThemeToggle />
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel className="font-bold">Theme</DropdownMenuLabel>
          <ThemeToggle />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
