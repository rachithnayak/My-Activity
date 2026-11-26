import { NavLink } from "react-router-dom";
import { Home, Clapperboard, Moon, Gamepad2, Bookmark } from "lucide-react";
import { useList } from "../context/ListContext";

const links = [
  { to: "/", label: "Home", Icon: Home, active: "text-white" },
  {
    to: "/movies",
    label: "Movies",
    Icon: Clapperboard,
    active: "text-red-400",
  },
  { to: "/anime", label: "Anime", Icon: Moon, active: "text-purple-400" },
  { to: "/games", label: "Games", Icon: Gamepad2, active: "text-teal-400" },
  { to: "/list", label: "My List", Icon: Bookmark, active: "text-white" },
];

function Nav() {
  const { list } = useList();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t border-white/10 bg-black/60 px-2 py-2 text-white backdrop-blur
                 md:top-0 md:right-auto md:w-28 md:flex-col md:items-stretch md:justify-start md:gap-3 md:border-r md:border-t-0 md:px-3 md:py-6"
    >
      {/* logo: desktop only */}
      <div className="mb-4 hidden flex-col items-center gap-1 text-red-500 md:flex">
        <span className="text-3xl leading-none">✦</span>
        <span className="text-[10px] font-semibold tracking-widest text-white">
          MY ACTIVITY
        </span>
      </div>

      {links.map(({ to, label, Icon, active }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs transition ${
              isActive
                ? `bg-white/10 font-semibold ${active}`
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          <Icon size={22} />
          <span>{label}</span>

          {to === "/list" && list.length > 0 && (
            <span className="absolute right-1 top-0 rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
              {list.length}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
