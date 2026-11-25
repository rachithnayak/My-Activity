import { Link } from "react-router-dom";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

function Hero({ movie }) {
  const { addItem, removeItem, isInList } = useList();
  const inList = isInList(movie.id, "movie");

  return (
    <div className="relative mb-8 h-80 overflow-hidden rounded-2xl md:h-96">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

      <div className="relative flex h-full max-w-xl flex-col justify-end gap-2 p-6 md:p-10">
        <span className="w-fit rounded-full bg-black/50 px-3 py-1 text-xs">
          ⭐ Top Pick
        </span>
        <h1 className="text-3xl font-bold md:text-5xl">{movie.title}</h1>
        <p className="text-sm text-gray-300">
          {movie.release_date?.slice(0, 4)} • ⭐{" "}
          {movie.vote_average?.toFixed(1)}
        </p>
        <p className="line-clamp-2 text-sm text-gray-200">{movie.overview}</p>

        <div className="mt-2 flex gap-3">
          {inList ? (
            <button
              className="rounded border px-4 py-2"
              onClick={() => removeItem(movie.id, "movie")}
            >
              ✓ In your list
            </button>
          ) : (
            <button
              className={`rounded px-4 py-2 text-white ${accent.movie}`}
              onClick={() =>
                addItem({
                  id: movie.id,
                  title: movie.title,
                  poster: movie.poster_path,
                  type: "movie",
                  rating: movie.vote_average,
                })
              }
            >
              + Add to List
            </button>
          )}
          <Link to={`/movies/${movie.id}`} className="rounded border px-4 py-2">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
