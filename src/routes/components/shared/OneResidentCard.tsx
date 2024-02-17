import { Link } from "rakkasjs";

interface OneItemCardProps {
  id: string|null|undefined;
  name: string|null|undefined;
  href: string|null|undefined;
  img?: string|null|undefined;
  status?: string|null|undefined;
}

export function OneResidentCard({ href, id, name, img, status }: OneItemCardProps) {
  const status_badge_styles = () => {
    switch (status) {
      case "Alive":
        return "badge-success";
      case "Dead":
        return "badge-error";
      case "unknown":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };
  return (
    <Link
      href={href??"."}
      className="flex flex-col items-center p-2 rounded-lg bg-base-300
     gap-1 w-[90%] sm:w-[40%] md:w-[30%] lg:w-[24%] xl:w-[19%]"
    >
      {img && (
        <img
          className="w-full h-auto"
          src={img ?? "/placeholder.webp"}
          loading="lazy"
          alt={name ?? "resident"}
          height={"250px"}
          width={"200px"}
        />
      )}
      <span className="flex  justify-start items-start gap-2 w-full">
        <h1 className="text-xl font-bold">{id}.</h1>
        <h1 className="text-xl font-bold">{name}</h1>
      </span>
      {status && (
        <span
          data-tip={"status:" + status}
          className="flex w-full items-center gap-1 text-lg tooltip hover:tooltip-open tooltip-bottom"
        >
          status:
          <h3 className={`badge ${status_badge_styles()}`}>{status}</h3>
        </span>
      )}
    </Link>
  );
}
