import { PageProps, usePageContext, useQuery } from "rakkasjs";
export default function ProfilePage({}: PageProps) {
  const { locals } = usePageContext();
  const query = useQuery("viewer",() => {
    return locals.pb.authStore.model
  });
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center"></div>
  );
}
