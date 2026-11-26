import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameById } from "../api/rawg";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const { addItem, removeItem, isInList } = useList();

  useEffect(() => {
    getGameById(id)
      .then(setGame)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="p-4">Could not load game: {error}</p>;
  if (!game) return <p className="p-4">Loading...</p>;

  return (
    <div className="relative min-h-screen">
      {/* faded backdrop (same as before) */}
      {game.poster && (
        <>
          <img
            className="absolute inset-0 h-112 w-full object-cover opacity-30"
            src={game.poster}
            alt=""
          />
          <div className="absolute inset-0 h-112 bg-linear-to-b from-transparent to-[#0a0508]" />
        </>
      )}

      <div className="relative p-4 md:p-8">
        <Link to="/games" className="text-sm">
          ← Back
        </Link>

        <div className="mt-4 max-w-3xl">
          <h1 className="text-4xl font-bold">{game.title}</h1>
          <p className="mt-2">
            {game.released}
            {game.playtime > 0 && ` • ~${game.playtime} hrs`}
            {game.rating > 0 && ` • ⭐ ${game.rating}`}
          </p>

          <p className="mt-4 whitespace-pre-line">{game.description}</p>

          {isInList(game.id, "game") ? (
            <button
              className="mt-4 rounded-full border px-6 py-2"
              onClick={() => removeItem(game.id, "game")}
            >
              ✓ In your list (Remove)
            </button>
          ) : (
            <button
              className={`mt-4 rounded-full px-6 py-2 text-white ${accent.game}`}
              onClick={() =>
                addItem({
                  id: game.id,
                  title: game.title,
                  poster: game.poster,
                  type: "game",
                  rating: game.rating,
                })
              }
            >
              + Add to List
            </button>
          )}

          {/* the picture shown again, below the text */}
          {game.poster && (
            <img
              className="mt-6 w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl shadow-teal-900/40"
              src={game.poster}
              alt={game.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
