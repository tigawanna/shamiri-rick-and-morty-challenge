import { PageProps } from "rakkasjs";
import { OneProfileComponent } from "./components/OneProfileCharacters";

export default function OneProfilePage({ params }: PageProps) {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <OneProfileComponent profile_id={params.profile} is_viewer={true} />
    </div>
  );
}
