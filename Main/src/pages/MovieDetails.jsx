import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const KEY = import.meta.env.VITE_TMDB_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
      .then((r) => r.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Link to="/">← Back</Link>
      <h1 className="mt-4 text-3xl font-bold">{movie.title}</h1>
      <p>
        {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ⭐{" "}
        {movie.vote_average?.toFixed(1)}
      </p>
      <img
        className="my-4 w-64 rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
