import { useState, useEffect } from "react";
import Card from "../components/Card";

const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";

const TABS = [
  { id: "popular", label: "Popular" },
  { id: "top_rated", label: "Top Rated" },
  { id: "now_playing", label: "Now Playing" },
];

function toItem(m) {
  return {
    id: m.id,
    title: m.title,
    poster: m.poster_path,
    type: "movie",
    rating: m.vote_average,
  };
}

function Movies() {
  const [tab, setTab] = useState("popular");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch whenever the tab, the search text, or the page changes
  useEffect(() => {
    const url = query
      ? `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}&page=${page}`
      : `${BASE}/movie/${tab}?api_key=${KEY}&page=${page}`;

    setLoading(true);
    setError(null);

    // wait 500ms only when searching (debounce), no wait for tabs
    const timer = setTimeout(
      () => {
        fetch(url)
          .then((r) => {
            if (!r.ok) throw new Error(`TMDB error ${r.status}`);
            return r.json();
          })
          .then((data) => {
            const items = (data.results ?? []).map(toItem);
            // page 1 replaces the list, later pages are added to the end
            setMovies((prev) => (page === 1 ? items : [...prev, ...items]));
            setTotalPages(data.total_pages ?? 1);
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      },
      query ? 500 : 0,
    );

    return () => clearTimeout(timer);
  }, [tab, query, page]);

  function changeTab(id) {
    setTab(id);
    setPage(1);
    setMovies([]);
  }

  function changeQuery(text) {
    setQuery(text);
    setPage(1);
    setMovies([]);
  }

  return (
    <div className="p-4">
      <input
        className="mb-4 w-full rounded border p-2"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
      />

      {query ? (
        <h2 className="mb-4 text-xl font-bold">Results for "{query}"</h2>
      ) : (
        <div className="mb-4 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => changeTab(t.id)}
              className={`rounded-full border px-4 py-1 text-sm ${
                tab === t.id ? "bg-red-600 text-white" : "text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {error && <p>Could not load movies: {error}</p>}
      {loading && page === 1 && <p>Loading...</p>}
      {!loading && !error && movies.length === 0 && <p>No movies found</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((m, i) => (
          <Card key={`${m.id}-${i}`} item={m} />
        ))}
      </div>

      {movies.length > 0 && page < totalPages && (
        <button
          className="mx-auto mt-6 block rounded bg-red-600 px-6 py-2 text-white"
          onClick={() => setPage(page + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export default Movies;
