import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <img
        className="w-full rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="mt-2 text-sm">{movie.title}</p>
    </Link>
  );
}

export default MovieCard;
