import { Link } from "rakkasjs";

interface OneItemCardProps {
  id: string | null | undefined;
  name: string | null | undefined;
  href: string | null | undefined;
}

export function OneItemCard({ id, name, href }: OneItemCardProps) {
  if (!href) return null;
  return (
    <Link
      href={href ?? "."}
      className="flex flex-col items-center p-2 rounded-lg bg-base-300
     gap-1 w-fit px-3"
    >
      <span className="flex flex-col   justify-start items-start gap-2 w-full">
        <h1 className="text-6xl font-bold text-center w-full">{id}</h1>
        <h1 className="text-sm font-bold">{name}</h1>
      </span>
    </Link>
  );
}
