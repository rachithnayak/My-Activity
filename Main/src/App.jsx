import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";

function App() {
  const [popular, setPopular] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Load popular + new movies once, when the page opens
  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/movie/popular?api_key=${KEY}`).then((r) => r.json()),
      fetch(`${BASE}/movie/now_playing?api_key=${KEY}`).then((r) => r.json()),
    ]).then(([pop, now]) => {
      setPopular(pop.results);
      setNewMovies(now.results);
      setLoading(false);
    });
  }, []);

  // 2. Search whenever the text changes (waits 500ms after typing stops)
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(
        `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}`,
      )
        .then((r) => r.json())
        .then((data) => setResults(data.results));
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <input
        className="mb-6 w-full rounded border p-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query ? (
        <>
          <h2 className="mb-2 text-xl font-bold">Results for "{query}"</h2>
          {results.length === 0 && <p>No movies found</p>}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {results.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-xl font-bold">Popular</h2>
          <div className="mb-8 flex gap-4 overflow-x-auto">
            {popular.map((m) => (
              <div key={m.id} className="w-40 shrink-0">
                <MovieCard movie={m} />
              </div>
            ))}
          </div>

          <h2 className="mb-2 text-xl font-bold">New Movies</h2>
          <div className="flex gap-4 overflow-x-auto">
            {newMovies.map((m) => (
              <div key={m.id} className="w-40 shrink-0">
                <MovieCard movie={m} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
