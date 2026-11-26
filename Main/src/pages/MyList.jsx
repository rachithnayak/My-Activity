import { useState } from "react";
import { Link } from "react-router-dom";
import { useList } from "../context/ListContext";

const TABS = [
  { id: "all", label: "All", active: "bg-white text-black" },
  { id: "movie", label: "Movies", active: "bg-red-600 text-white" },
  { id: "anime", label: "Anime", active: "bg-purple-600 text-white" },
  { id: "game", label: "Games", active: "bg-teal-600 text-white" },
];

function MyList() {
  const { list, removeItem } = useList();
  const [filter, setFilter] = useState("all");

  const shown =
    filter === "all" ? list : list.filter((item) => item.type === filter);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold">My List</h1>
      <p className="mb-4 text-gray-400">{list.length} titles</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count =
            t.id === "all"
              ? list.length
              : list.filter((i) => i.type === t.id).length;
          return (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`rounded-full border px-4 py-1 text-sm ${
                filter === t.id ? t.active : "text-gray-300"
              }`}
            >
              {t.label} ({count})
            </button>
          );
        })}
      </div>

      {list.length === 0 && <p>Your list is empty. Find something to add!</p>}
      {list.length > 0 && shown.length === 0 && (
        <p>Nothing here yet in this category.</p>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {shown.map((item) => {
          const src = item.poster?.startsWith("http")
            ? item.poster
            : `https://image.tmdb.org/t/p/w500${item.poster}`;
          const path = item.type === "movie" ? "movies" : item.type;

          return (
            <div key={`${item.type}-${item.id}`}>
              <Link to={`/${path}/${item.id}`}>
                <img
                  className="aspect-2/3 w-full rounded-xl object-cover"
                  src={src}
                  alt={item.title}
                />
                <p className="mt-2 truncate text-sm">{item.title}</p>
              </Link>
              <button
                className="mt-1 text-xs text-red-400"
                onClick={() => removeItem(item.id, item.type)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyList;
