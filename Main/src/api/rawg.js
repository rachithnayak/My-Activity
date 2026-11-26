const KEY = import.meta.env.VITE_RAWG_KEY;
const BASE = "https://api.rawg.io/api";

function toItem(g) {
  return {
    id: g.id,
    title: g.name,
    poster: g.background_image,
    type: "game",
    rating: g.rating,
  };
}

export async function getGames({ ordering, page = 1, search = "", dates = "", platforms = "" }) {
  const params = new URLSearchParams({
    key: KEY,
    page,
    page_size: 20,
    ordering,
  });
  if (search) params.set("search", search);
  if (dates) params.set("dates", dates);
  if (platforms) params.set("parent_platforms", platforms);

  const res = await fetch(`${BASE}/games?${params}`);
  if (!res.ok) throw new Error(`RAWG error ${res.status}`);
  const json = await res.json();

  return {
    items: json.results.map(toItem),
    hasMore: Boolean(json.next),
  };
}

export async function getPopularGames() {
  const res = await fetch(`${BASE}/games?key=${KEY}&ordering=-added&page_size=20`);
  if (!res.ok) throw new Error(`RAWG error ${res.status}`);
  const json = await res.json();
  return json.results.map(toItem);
}

export async function getGameById(id) {
  const res = await fetch(`${BASE}/games/${id}?key=${KEY}`);
  if (!res.ok) throw new Error(`RAWG error ${res.status}`);
  const g = await res.json();
  return {
    id: g.id,
    title: g.name,
    poster: g.background_image,
    released: g.released,
    playtime: g.playtime,
    rating: g.rating,
    description: g.description_raw,
  };
}