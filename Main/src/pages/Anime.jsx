import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getAnimeList } from "../api/jikan";

const TABS = [
  { id: "popular", label: "Popular", sort: "popularityRank" },
  { id: "top", label: "Top Rated", sort: "ratingRank" },
  {
    id: "airing",
    label: "Airing Now",
    sort: "popularityRank",
    status: "current",
  },
];

function Anime() {
  const [tab, setTab] = useState(TABS[0]);
  const [query, setQuery] = useState("");
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(
      () => {
        getAnimeList({
          sort: tab.sort,
          status: tab.status,
          search: query,
          page,
        })
          .then(({ items, hasMore }) => {
            setAnime((prev) => (page === 1 ? items : [...prev, ...items]));
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
    setAnime([]);
  }

  function changeQuery(text) {
    setQuery(text);
    setPage(1);
    setAnime([]);
  }

  return (
    <div className="p-4">
      <input
        className="mb-4 w-full rounded border p-2"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
      />

      {query ? (
        <h2 className="mb-4 text-xl font-bold">Results for "{query}"</h2>
      ) : (
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => changeTab(t)}
              className={`rounded-full border px-4 py-1 text-sm ${
                tab.id === t.id ? "bg-purple-600 text-white" : "text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {error && <p>Could not load anime: {error}</p>}
      {loading && page === 1 && <p>Loading...</p>}
      {!loading && !error && anime.length === 0 && <p>No anime found</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {anime.map((a, i) => (
          <Card key={`${a.id}-${i}`} item={a} />
        ))}
      </div>

      {anime.length > 0 && hasMore && (
        <button
          className="mx-auto mt-6 block rounded bg-purple-600 px-6 py-2 text-white"
          onClick={() => setPage(page + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export default Anime;
