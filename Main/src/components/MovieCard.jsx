function MovieCard({ movie }) {
  return (
    <div>
      <img
        className="w-full rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="mt-2 text-sm">{movie.title}</p>
    </div>
  );
}

export default MovieCard;
