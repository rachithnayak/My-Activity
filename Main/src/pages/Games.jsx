import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getGames } from "../api/rawg";

const today = new Date().toISOString().slice(0, 10);

const TABS = [
  { id: "popular", label: "Popular", ordering: "-added" },
  { id: "top", label: "Top Rated", ordering: "-rating" },
  {
    id: "new",
    label: "New",
    ordering: "-released",
    dates: `2024-01-01,${today}`,
  },
];

function Games() {
  const [tab, setTab] = useState(TABS[0]);
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(
      () => {
        getGames({
          ordering: tab.ordering,
          dates: tab.dates,
          search: query,
          page,
        })
          .then(({ items, hasMore }) => {
            setGames((prev) => (page === 1 ? items : [...prev, ...items]));
            setHasMore(hasMore);
          })
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
      },
      query ? 500 : 0,
    );

    return () => clearTimeout(timer);
  }, [tab, query, page]);

  function changeTab(t) {
    setTab(t);
    setPage(1);
    setGames([]);
  }

  function changeQuery(text) {
    setQuery(text);
    setPage(1);
    setGames([]);
  }

  return (
    <div className="p-4">
      <input
        className="mb-4 w-full rounded border p-2"
        placeholder="Search games..."
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
              onClick={() => changeTab(t)}
              className={`rounded-full border px-4 py-1 text-sm ${
                tab.id === t.id ? "bg-teal-600 text-white" : "text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {error && <p>Could not load games: {error}</p>}
      {loading && page === 1 && <p>Loading...</p>}
      {!loading && !error && games.length === 0 && <p>No games found</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {games.map((g, i) => (
          <Card key={`${g.id}-${i}`} item={g} />
        ))}
      </div>

      {games.length > 0 && hasMore && (
        <button
          className="mx-auto mt-6 block rounded bg-teal-600 px-6 py-2 text-white"
          onClick={() => setPage(page + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export default Games;
