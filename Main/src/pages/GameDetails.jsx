import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameById } from "../api/rawg";
import { useList } from "../context/ListContext";
import { accent } from "../theme";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const { addItem, removeItem, isInList } = useList();

  useEffect(() => {
    getGameById(id).then(setGame);
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div className="p-4 md:p-8">
      <Link to="/games" className="text-sm">
        ← Back
      </Link>

      <div className="mt-4 flex flex-col gap-6 md:flex-row">
        <img
          className="w-56 rounded-lg md:w-72"
          src={game.poster}
          alt={game.title}
        />

        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">{game.title}</h1>
          <p className="mt-2">
            {game.released}
            {game.playtime > 0 && ` • ~${game.playtime} hrs`}
            {` • ⭐ ${game.rating}`}
          </p>
          <p className="mt-4">{game.description}</p>

          {isInList(game.id, "game") ? (
            <button
              className="mt-4 rounded border px-4 py-2"
              onClick={() => removeItem(game.id, "game")}
            >
              ✓ In your list (Remove)
            </button>
          ) : (
            <button
              className={`mt-4 rounded px-4 py-2 text-white ${accent.game}`}
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
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
