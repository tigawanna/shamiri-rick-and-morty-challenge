import { SignInForm } from "./components/SignInForm";
import { PageProps, Head } from "rakkasjs";

export default function SignInPage({}: PageProps) {
  return (
    <div className="w-full h-fit flex items-center justify-center">
      <Head title="Sign in" description={"Sign in to your account"} />
      <SignInForm />
    </div>
  );
}
