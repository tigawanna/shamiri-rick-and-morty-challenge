import { Link } from "rakkasjs";
import dayjs from "dayjs";
interface OneItemCardProps {
  id: string | null | undefined;
  name: string | null | undefined;
  type?: string | null | undefined;
  href: string | null | undefined;
  created?: string | null | undefined;
}

export function OneItemCard({ id, name, href,created,type }: OneItemCardProps) {
  if (!href) return null;
    const created_date = dayjs(created).format("DD-MM-YYYY");
  return (
    <Link
      href={href ?? "."}
      className="flex flex-col items-center justify-between p-2 rounded-lg bg-base-300
     gap-1 w-fit px-3 py-2 h-32 min-w-44 group flex-grow"
    >
      <span className="w-full">
        <h1 className="text-5xl font-bold text-secondary">{id}</h1>
      </span>
      <div className="flex flex-col  gap-1 w-full group-hover:text-secondary group-hover:underline">
        {name&&<h1 className="text-xs line-clamp-1">{name}</h1>}
        {type&&<h1 className="text-xs line-clamp-1">{type}</h1>}
        {created_date && <h1 className="text-xs">Created on: {created_date}</h1>}
      </div>
    </Link>
  );
}
