import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnimeById } from "../api/jikan";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);
  const { addItem, removeItem, isInList } = useList();

  useEffect(() => {
    getAnimeById(id)
      .then(setAnime)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="p-4">Could not load anime: {error}</p>;
  if (!anime) return <p className="p-4">Loading...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {anime.poster && (
        <>
          <img
            className="absolute inset-0 h-[28rem] w-full scale-110 object-cover opacity-30 blur-2xl"
            src={anime.poster}
            alt=""
          />
          <div className="absolute inset-0 h-[28rem] bg-gradient-to-b from-transparent to-[#0a0508]" />
        </>
      )}

      <div className="relative p-4 md:p-8">
        <Link to="/anime" className="text-sm">
          ← Back
        </Link>

        <div className="mt-4 flex flex-col gap-6 md:flex-row">
          <img
            className="w-56 rounded-2xl border border-white/10 shadow-2xl shadow-purple-900/40 md:w-72"
            src={anime.poster}
            alt={anime.title}
          />

          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">{anime.title}</h1>
            <p className="mt-2">
              {anime.year}
              {anime.episodes && ` • ${anime.episodes} episodes`}
              {anime.rating && ` • ⭐ ${anime.rating}`}
            </p>

            <p className="mt-4">{anime.synopsis}</p>

            {isInList(anime.id, "anime") ? (
              <button
                className="mt-4 rounded-full border px-6 py-2"
                onClick={() => removeItem(anime.id, "anime")}
              >
                ✓ In your list (Remove)
              </button>
            ) : (
              <button
                className={`mt-4 rounded-full px-6 py-2 text-white ${accent.anime}`}
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
    </div>
  );
}

export default AnimeDetails;
