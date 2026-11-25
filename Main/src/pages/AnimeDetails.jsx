import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnimeById } from "../api/jikan";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnimeById(id)
      .then(setAnime)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>Could not load anime: {error}</p>;
  if (!anime) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-8">
      <Link to="/anime" className="text-sm">
        ← Back
      </Link>

      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        <img
          className="w-56 rounded-lg md:w-72"
          src={anime.poster}
          alt={anime.title}
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{anime.title}</h1>
          <p className="mt-2">
            {anime.year} • {anime.episodes} episodes • ⭐ {anime.rating}
          </p>
          <p className="mt-4">{anime.synopsis}</p>

          {isInList(anime.id, "anime") ? (
            <button
              className="mt-4 rounded border px-4 py-2"
              onClick={() => removeItem(anime.id, "anime")}
            >
              ✓ In your list (Remove)
            </button>
          ) : (
            <button
              className={`mt-4 rounded px-4 py-2 text-white ${accent.anime}`}
              onClick={() =>
                addItem({
                  id: anime.id,
                  title: anime.title,
                  poster: anime.poster,
                  type: "anime",
                  rating: anime.rating,
                })
              }
            >
              + Add to List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails; // this line fixes your error
