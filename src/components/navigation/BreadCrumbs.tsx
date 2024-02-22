import { Link } from "rakkasjs";
import { useRakkasBreadCrumbs } from "./useBreadCrumbs";
import { ChevronRight } from "lucide-react";

interface BreadCrumbsProps {}

export default function BreadCrumbs({}: BreadCrumbsProps) {
  const { breadcrumb_routes, current } = useRakkasBreadCrumbs();

  return (
    <div className="flex min-h-8 flex-wrap z-50 px-1 py-1  ml-4 gap-1">
      {breadcrumb_routes.map(({ name, path }, idx) => {
        const new_url = new URL(current);
        new_url.pathname = path;
        return (
          <Link
            key={name}
            href={new_url.toString()}
            className="hover:brightness-50 flex"
          >
            {name} {idx < breadcrumb_routes.length - 1 && <ChevronRight />}
          </Link>
        );
      })}
    </div>
  );
}
