import { Button } from "@/components/shadcn/ui/button";
import { hotToast } from "@/components/wrappers/toast";
import { oneClickOauthLogin } from "@/lib/pb/auth";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Loader } from "lucide-react";
import { useMutation, usePageContext, useQueryClient } from "rakkasjs";
import { FaGithub, FaGoogle } from "react-icons/fa";
interface CharacterAuthProps {}

export function CharacterAuth({}: CharacterAuthProps) {
  const qc = useQueryClient();
  const { locals } = usePageContext();

  const mutation = useMutation(
    ({ provider }: { provider: "github" | "google" }) => {
      return tryCatchWrapper(
        oneClickOauthLogin({
          pb: locals.pb,
          collection: "shamiri_users",
          oauth_config: {
            provider,
          },
        }),
      );
    },
    {
      onSuccess(data) {
        if (data && data?.data) {
          hotToast({
            title: "Welcome " + data?.data?.username,
            type: "success",
          });
          qc.invalidateQueries(["viewer"]);
          window.location.reload();
          // const navigate_to = current.searchParams.get("return_to");
          // navigate(navigate_to ?? "/");
        }
        if (data.error) {
          // toast(data.error.message, { type: "error", autoClose: false });
          hotToast({
            title: "Something went wrong",
            description: data?.error?.message,
            type: "error",
          });
        }
      },
    },
  );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex gap-2 justify-center items-center p-2">
          <Button
            onClick={() => mutation.mutate({ provider: "github" })}
            disabled={mutation.isLoading}
            className=" btn-wide text-lg flex gap-4"
          >
            <FaGithub />
            Github
          </Button>
          <Button
            onClick={() => mutation.mutate({ provider: "google" })}
            disabled={mutation.isLoading}
            className=" btn-wide text-lg flex gap-4"
          >
            <FaGoogle />
            Google
          </Button>
        </div>
        {mutation.isLoading && <Loader className="animate-spin" />}
      </div>
    </div>
  );
}
