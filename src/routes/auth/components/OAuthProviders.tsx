import { oneClickOauthLogin } from "@/lib/pb/auth";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { useLocation, useMutation, usePageContext, useQueryClient } from "rakkasjs";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {  Loader } from "lucide-react";
import { navigate } from "rakkasjs";
import { Button } from "@/components/shadcn/ui/button";
import { hotToast } from "@/components/wrappers/toast";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const qc = useQueryClient();
  const { locals } = usePageContext();
   const {current} = useLocation()

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
          // window.location.reload();
          // const navigate_to = current.searchParams.get("return_to");
          const return_to = current.searchParams.get("return_to");
          navigate(return_to ?? "/");
        }
        if (data.error) {
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
    <div className="w-full  flex flex-col items-center justify-center gap-5">
      <h2>login with</h2>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex gap-2 justify-center items-center p-2">
          <Button
            variant={"outline"}
            onClick={() => mutation.mutate({ provider: "github" })}
            disabled={mutation.isLoading}
            className=" btn-wide text-lg flex gap-4 rounded-md"
          >
            <FaGithub />
            Github
          </Button>
          <Button
            variant={"outline"}
            onClick={() => mutation.mutate({ provider: "google" })}
            disabled={mutation.isLoading}
            className=" btn-wide text-lg flex gap-4 rounded-md"
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
