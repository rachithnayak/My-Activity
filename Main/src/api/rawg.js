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