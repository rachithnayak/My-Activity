import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

const KEY = import.meta.env.VITE_TMDB_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const { addItem, removeItem, isInList } = useList();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
      .then((r) => r.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}`)
      .then((r) => r.json())
      .then((data) => {
        const found = (data.results ?? []).find(
          (v) => v.site === "YouTube" && v.type === "Trailer",
        );
        setTrailer(found ? found.key : null);
      });
  }, [id]);

  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="relative min-h-screen">
      {/* faded backdrop behind the top of the page */}
      {movie.backdrop_path && (
        <>
          <img
            className="absolute inset-0 h-[28rem] w-full object-cover opacity-30"
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt=""
          />
          <div className="absolute inset-0 h-[28rem] bg-gradient-to-b from-transparent to-[#0a0508]" />
        </>
      )}

      {/* content sits on top of the backdrop */}
      <div className="relative p-4 md:p-8">
        <Link to="/movies" className="text-sm">
          ← Back
        </Link>

        <div className="mt-4 flex flex-col gap-6 md:flex-row">
          <img
            className="w-56 rounded-2xl border border-white/10 shadow-2xl shadow-red-900/40 md:w-72"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2">
              {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ⭐{" "}
              {movie.vote_average?.toFixed(1)}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="mt-4">{movie.overview}</p>

            {isInList(movie.id, "movie") ? (
              <button
                className="mt-4 rounded-full border px-6 py-2"
                onClick={() => removeItem(movie.id, "movie")}
              >
                ✓ In your list (Remove)
              </button>
            ) : (
              <button
                className={`mt-4 rounded-full px-6 py-2 text-white ${accent.movie}`}
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

            {trailer ? (
              <iframe
                className="mt-6 aspect-video w-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                allowFullScreen
              />
            ) : (
              <p className="mt-6">No trailer available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
