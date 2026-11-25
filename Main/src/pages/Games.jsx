import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { getPopularGames } from "../api/rawg";

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularGames()
      .then((data) => setGames(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Could not load games: {error}</p>;

  return (
    <div className="p-4">
      <Link to="/">← Movies</Link>
      <h1 className="my-4 text-3xl font-bold">Games</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {games.map((g) => (
          <Card key={g.id} item={g} />
        ))}
      </div>
    </div>
  );
}

export default Games;
