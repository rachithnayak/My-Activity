import { Link } from "react-router-dom";

function Card({ item }) {
  const src = item.poster?.startsWith("http")
    ? item.poster
    : `https://image.tmdb.org/t/p/w500${item.poster}`;
  const path = item.type === "movie" ? "movies" : item.type;

  return (
    <Link to={`/${path}/${item.id}`}>
      <img className="w-full rounded-lg" src={src} alt={item.title} />
      <p className="mt-2 text-sm">{item.title}</p>
    </Link>
  );
}

export default Card;
