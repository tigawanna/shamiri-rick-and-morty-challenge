import { Link, StyledLink, useLocation } from "rakkasjs";
import { Home, Pin, Tv, Users,Beaker } from "lucide-react";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const { current } = useLocation();
  const routes = [
    { name: "home", url: "/", icon: <Home /> },
    { name: "episodes", url: "/episodes", icon: <Tv /> },
    { name: "characters", url: "/characters", icon: <Users /> },
    { name: "locations", url: "/locations", icon: <Pin /> },
    { name: "test", url: "/test", icon: <Beaker /> },
  ];

  return (
    <header
      className=" h-screen  flex flex-col  justify-center items-center bg-base-300  
    z-30 gap-1 "
    >
      <div className="w-full h-full flex flex-col justify-center items-center p-2 pb-12 pt-3 gap-5">
        <div className="h-full flex flex-col gap-3 items-center justify-end divide-y-2">
          {routes.map((route) => {
            const is_selected =
              current.pathname.split("/")[1] === route.url.split("/")[1];
            const is_selected_styles = is_selected
              ? ` text-3xl  items-center flex gap-3 
                hover:bg-base-300 
                 rounded-lg p-2 lg:p-4 tooltip hover:tooltip-right text-secondary`
              : `text-3xl  items-center flex gap-3 
                hover:bg-base-300 
                 rounded-lg p-2 lg:p-4 tooltip hover:tooltip-right hover:text-secondary `;
            if (
              (route.name === "test" || route.name === "pb") &&
              !import.meta.env.DEV
            )
              return;
            return (
              <Link
                key={route.name}
                href={route.url}
                data-tip={route.name}
                className={is_selected_styles}
              >
                {route.icon}
                {/* <div className="hidden lg:flex text-xl font-bold">
                  {route.name}
                </div> */}
              </Link>
            );
          })}
        </div>
        <MiniSettingsModal />
      </div>
    </header>
  );
}
