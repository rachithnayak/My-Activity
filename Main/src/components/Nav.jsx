import { NavLink } from "react-router-dom";
import { useList } from "../context/ListContext";

const links = [
  { to: "/", label: "Movies" },
  { to: "/anime", label: "Anime" },
  { to: "/games", label: "Games" },
  { to: "/list", label: "My List" },
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
            `text-center text-sm ${isActive ? "font-bold text-red-500" : "text-gray-300"}`
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