import { Link } from "react-router-dom";

function Card({ item }) {
  const src = item.poster?.startsWith("http")
    ? item.poster
    : `https://image.tmdb.org/t/p/w500${item.poster}`;
  const path = item.type === "movie" ? "movies" : item.type;

  return (
    <Link to={`/${path}/${item.id}`} className="group block">
      <img
        className="aspect-2/3 w-full rounded-xl object-cover transition group-hover:scale-105"
        src={src}
        alt={item.title}
      />
      <p className="mt-2 truncate text-sm">{item.title}</p>
    </Link>
  );
}

export default Card;
