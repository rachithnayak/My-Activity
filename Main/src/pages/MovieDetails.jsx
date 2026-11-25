import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useList } from "../context/ListContext";

const KEY = import.meta.env.VITE_TMDB_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null); // ADD THIS

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
      .then((r) => r.json())
      .then((data) => setMovie(data));
  }, [id]);

  // ADD THIS WHOLE useEffect
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}`)
      .then((r) => r.json())
      .then((data) => {
        const found = data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer",
        );
        setTrailer(found ? found.key : null);
      });
  }, [id]);

  const { addItem, removeItem, isInList } = useList();

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-8">
      <Link to="/" className="text-sm">
        ← Back
      </Link>

      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        <img
          className="w-56 rounded-lg md:w-72"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-2">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ⭐{" "}
            {movie.vote_average?.toFixed(1)}
          </p>
          <p className="mt-4">{movie.overview}</p>

          {isInList(movie.id, "movie") ? (
            <button
              className="mt-4 rounded border px-4 py-2"
              onClick={() => removeItem(movie.id, "movie")}
            >
              ✓ In your list (Remove)
            </button>
          ) : (
            <button
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
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
  );
}

export default MovieDetails;
