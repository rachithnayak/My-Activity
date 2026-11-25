const BASE = "https://api.jikan.moe/v4";

function toItem(a) {
  return {
    id: a.mal_id,
    title: a.title,
    poster: a.images.jpg.image_url,
    type: "anime",
    rating: a.score,
  };
}

export async function getTopAnime() {
  const res = await fetch(`${BASE}/top/anime`);
  const data = await res.json();
  return data.data.map(toItem);
}

export async function getAnimeById(id) {
  const res = await fetch(`${BASE}/anime/${id}`);
  const json = await res.json();
  const a = json.data;
  return {
    id: a.mal_id,
    title: a.title,
    poster: a.images.jpg.large_image_url,
    year: a.year,
    episodes: a.episodes,
    rating: a.score,
    synopsis: a.synopsis,
  };
}