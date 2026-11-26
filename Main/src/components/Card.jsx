import { Link } from "react-router-dom";

function Card({ item }) {
  const src = item.poster?.startsWith("http")
    ? item.poster
    : `https://image.tmdb.org/t/p/w500${item.poster}`;
  const path = item.type === "movie" ? "movies" : item.type;

  return (
    <Link to={`/${path}/${item.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <img
          className="aspect-2/3 w-full object-cover transition group-hover:scale-105"
          src={src}
          alt={item.title}
        />
        {item.rating > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs">
            ⭐ {Number(item.rating).toFixed(1)}
          </span>
        )}
      </div>
      <p className="mt-2 truncate text-sm">{item.title}</p>
    </Link>
  );
}

export default Card;
