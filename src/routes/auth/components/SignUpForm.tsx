import { Button } from "@/components/shadcn/ui/button";
import { OAuthproviders } from "./OAuthProviders";
import { Link, navigate, useLocation, usePageContext } from "rakkasjs";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TSignupformSchema } from "./auth";
import { useMutation, useQueryClient } from "rakkasjs";
import { useFormHook } from "@/components/form/useForm";
import { useState } from "react";
import { Loader } from "lucide-react";
import { hotToast } from "@/components/wrappers/toast";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { createUser } from "@/lib/pb/auth";

interface SignupFormProps {}

export function SignUpForm({}: SignupFormProps) {
  const [show, setShow] = useState(false);
  const page_ctx = usePageContext();
  const { current } = useLocation();
  const qc = useQueryClient();

  const { handleChange, input, error, setError, setInput, validateInputs } =
    useFormHook<TSignupformSchema>({
      initialValues: {
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      },
    });
  const mutation = useMutation(
    (vars: typeof input) => {
      return createUser({
        pb: page_ctx.locals.pb,
        collection: "shamiri_users",
        data: vars,
      });
    },
    {
      onError(error: any) {
        hotToast({
          title: "Something went wrong",
          description: error?.message,
          type: "error",
        });
      },
      onSuccess(data) {
        if (data && data?.data) {
          qc.invalidateQueries(["viewer"]);
          console.log({ data });
          hotToast({
            title: `Welcome ${data?.data?.record?.username}`,
            type: "success",
          });
          navigate("/dashboard");
        }
        if (data && data?.error) {
          hotToast({
            title: "Something went wrong",
            description: data?.error?.message,
            type: "error",
          });
        }
      },
    },
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const is_valid = validateInputs((ipt) => {
      if (ipt.password !== ipt.passwordConfirm) {
        setError({
          name: "passwordConfirm",
          message: "passwords do not match",
        });
        return false;
      }
      return true;
    });
    e.preventDefault();
    if (is_valid) {
      mutation.mutate(input);
    }
    // mutation.mutate(input);
  }
  return (
    <div className="w-full  h-fit flex flex-col items-center justify-center p-5 pb-5 gap-5">
      <div className="w-full h-full md:w-[60%] lg:w-[40%] flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Sign Up</h1>

        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          // method="POST"
          onSubmit={handleSubmit}
        >
          <PbTheTextInput
            field_key={"email"}
            field_name="Email"
            required
            val={input.email}
            onChange={handleChange}
            validation_error={error}
            // @ts-expect-error
            pb_error={mutation.data?.error}
          />
          <PbTheTextInput
            field_key={"username"}
            field_name="Username"
            required
            min={4}
            val={input.username}
            onChange={handleChange}
            validation_error={error}
            // @ts-expect-error
            pb_error={mutation.data?.error}
          />
          <PbTheTextInput
            field_key={"password"}
            field_name="password"
            type={show ? "text" : "password"}
            required
            min={8}
            onChange={handleChange}
            val={input.password}
            validation_error={error}
            // @ts-expect-error
            pb_error={mutation.data?.error}
          />
          <PbTheTextInput
            field_key={"passwordConfirm"}
            field_name="passwordConfirm"
            type={show ? "text" : "password"}
            required
            min={8}
            onChange={handleChange}
            val={input.passwordConfirm}
            validation_error={error}
            // @ts-expect-error
            pb_error={mutation.data?.error}
          />

          <TheTextInput
            field_key={"show"}
            field_name={"show password"}
            onChange={(e) => setShow(e.target.checked)}
            type="checkbox"
            className="border border-secondary checkbox h-5 w-5 bg-secondary/30"
            container_classname="border-none  flex flex-row justify-center items-center gap-3"
            label_classname="min-w-fit "
          />

          <Button
            type="submit"
            disabled={mutation.isLoading}
            className="btn btn-sm btn-outline min-w-[50%]"
            variant={"ghost"}
            size={"sm"}
          >
            {" "}
            Sign Up {mutation.isLoading && <Loader className="animate-spin" />}
          </Button>
        </form>

        {mutation.data?.error && (
          <div className="w-full flex justify-center">
            <p className="bg-error-content text-error text-sm p-2 rounded-e-lg ">
              {mutation.data.error?.message}
            </p>
          </div>
        )}

        <div className="w-full flex items-center justify-center">
          <span className="w-full border-t" />
          <span className="bg-background px-2 text-muted-foreground min-w-fit">
            Or continue with
          </span>
          <span className="w-full border-t" />
        </div>

        <OAuthproviders />
      </div>

      <p className=" text-sm pb-5">
        Already have an account ?{" "}
        <Link href="/auth" className="text-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
