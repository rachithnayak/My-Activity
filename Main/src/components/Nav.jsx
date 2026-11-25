import { NavLink } from "react-router-dom";
import { useList } from "../context/ListContext";

const links = [
  { to: "/", label: "Home", active: "text-white" },
  { to: "/movies", label: "Movies", active: "text-red-500" },
  { to: "/anime", label: "Anime", active: "text-purple-400" },
  { to: "/games", label: "Games", active: "text-teal-400" },
  { to: "/list", label: "My List", active: "text-white" },
];

function Nav() {
  const { list } = useList();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-black p-3 text-white
                 md:top-0 md:right-auto md:w-24 md:flex-col md:justify-start md:gap-8 md:border-r md:border-t-0"
    >
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.to === "/"}
          className={({ isActive }) =>
            `text-center text-sm ${isActive ? `font-bold ${l.active}` : "text-gray-300"}`
          }
        >
          {l.label}
          {l.label === "My List" && ` (${list.length})`}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
