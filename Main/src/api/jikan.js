const BASE = "https://kitsu.io/api/edge";
const HEADERS = { Accept: "application/vnd.api+json" };

// Kitsu rating is out of 100 as text ("82.5"), we want out of 10
function toRating(r) {
  return r ? Number((parseFloat(r) / 10).toFixed(1)) : null;
}

function toItem(a) {
  return {
    id: Number(a.id), // Kitsu ids are text, we use numbers like the other APIs
    title: a.attributes.canonicalTitle,
    poster: a.attributes.posterImage?.medium ?? null,
    type: "anime",
    rating: toRating(a.attributes.averageRating),
  };
}

export async function getAnimeList({ sort, status = "", search = "", page = 1 }) {
  const params = new URLSearchParams();
  params.set("page[limit]", 20);
  params.set("page[offset]", (page - 1) * 20);
  if (search) params.set("filter[text]", search);
  else {
    params.set("sort", sort);
    if (status) params.set("filter[status]", status);
  }

  const res = await fetch(`${BASE}/anime?${params}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Kitsu error ${res.status}`);
  const json = await res.json();

  return {
    items: json.data.map(toItem),
    hasMore: Boolean(json.links?.next), // Kitsu gives no "next" link on the last page
  };
}

export async function getTopAnime() {
  const res = await fetch(
    `${BASE}/anime?page[limit]=20&sort=popularityRank`,
    { headers: HEADERS },
  );
  if (!res.ok) throw new Error(`Kitsu error ${res.status}`);
  const json = await res.json();
  return json.data.map(toItem);
}

export async function getAnimeById(id) {
  const res = await fetch(`${BASE}/anime/${id}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Kitsu error ${res.status}`);
  const json = await res.json();
  const a = json.data;
  return {
    id: Number(a.id),
    title: a.attributes.canonicalTitle,
    poster:
      a.attributes.posterImage?.large ?? a.attributes.posterImage?.medium ?? null,
    year: a.attributes.startDate?.slice(0, 4),
    episodes: a.attributes.episodeCount,
    rating: toRating(a.attributes.averageRating),
    synopsis: a.attributes.synopsis,
  };
}