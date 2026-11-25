import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { getTopAnime } from "../api/jikan";

function Anime() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopAnime().then((data) => {
      setAnime(data);
      setLoading(false);
    });
  }, []);

  const [error, setError] = useState(null);

  useEffect(() => {
    getTopAnime()
      .then((data) => setAnime(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Could not load anime: {error}</p>;
  
  return (
    <div className="p-4">
      <Link to="/">← Movies</Link>
      <h1 className="my-4 text-3xl font-bold">Anime</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {anime.map((a) => (
          <Card key={a.id} item={a} />
        ))}
      </div>
    </div>
  );
}

export default Anime; // this line fixes your error
