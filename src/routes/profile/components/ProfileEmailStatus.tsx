import { Button } from "@/components/shadcn/ui/button";
import { hotToast } from "@/components/wrappers/toast";
import { verifyUserEmail } from "@/lib/pb/auth";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Loader, Mail, Verified, VerifiedIcon } from "lucide-react";
import { useMutation, usePageContext, useQueryClient } from "rakkasjs";

interface ProfileEmailStatusProps {
  email: string;
  verified: boolean;
}

export function ProfileEmailStatus({
  email,
  verified,
}: ProfileEmailStatusProps) {
  const { locals } = usePageContext();
  const qc = useQueryClient();
  const request_verfication_mutation = useMutation(
    ({ email }: { email: string }) => {
      return tryCatchWrapper(
        verifyUserEmail({
          pb: locals.pb,
          collection: "shamiri_users",
          email,
        }),
      );
    },
    {
      onSuccess: async (data) => {
        // console.log("data === ",data)
        if (data.data) {
          qc.invalidateQueries(["viewer"]);
          await locals.pb.collection("shamiri_users").authRefresh();
          hotToast({
            type: "success",
            title: "Verification email sent",
          });
        }
        if (data.error) {
          hotToast({
            type: "error",
            title: "Something went wrong",
            description: data?.error?.message,
          });
        }
      },
      onError(error: any) {
        hotToast({
          type: "error",
          title: "Something went wrong",
          description: error?.message,
        });
      },
    },
  );
  if (verified) {
    return (
      <div className="flex gap-2 items-center justify-center ">
        <h1 className="text- font-bold text-success">{email}</h1>
        <Verified className="text-success w-4 h-4" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-2 bg-base-200">
      <div className="flex gap-3 items-center justify-center rounded-lg">
        <div
          data-tip={"Unveridied emails have read only access"}
          className="text-lg flex gap-2 items-center text-error tooltip tooltip-bottom hover:tooltip-open "
        >
          <Mail />
          {email}
          <VerifiedIcon className="h-5 w-5 text-red-600 peer" />
        </div>

        <button
          className="btn btn-secondary btn-sm  flex  gap-2 "
          disabled={request_verfication_mutation.isLoading}
          onClick={() => request_verfication_mutation.mutate({ email })}
        >
          <h3>verify email</h3>
        </button>
        {request_verfication_mutation.isLoading && (
          <Loader className="animate-spin" />
        )}
      </div>
    </div>
  );
}
