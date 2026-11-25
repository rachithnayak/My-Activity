import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Row from "../components/Row";
import { getTopAnime } from "../api/jikan";
import { getPopularGames } from "../api/rawg";

const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";

function toItem(m) {
  return {
    id: m.id,
    title: m.title,
    poster: m.poster_path,
    type: "movie",
    rating: m.vote_average,
  };
}

// fetchers live outside the component so they never change
function getPopularMovies() {
  return fetch(`${BASE}/movie/popular?api_key=${KEY}`)
    .then((r) => {
      if (!r.ok) throw new Error(`TMDB error ${r.status}`);
      return r.json();
    })
    .then((d) => d.results.map(toItem));
}

// each row loads on its own, so one failing API can't break the others
function useRow(fetcher) {
  const [state, setState] = useState({ items: [], loading: true, error: null });

  useEffect(() => {
    fetcher()
      .then((items) =>
        setState({ items: items.slice(0, 15), loading: false, error: null }),
      )
      .catch((err) =>
        setState({ items: [], loading: false, error: err.message }),
      );
  }, [fetcher]);

  return state;
}

function Home() {
  const movies = useRow(getPopularMovies);
  const anime = useRow(getTopAnime);
  const games = useRow(getPopularGames);

  return (
    <div className="p-4 md:p-8">
      <Row
        title="Movies"
        subtitle="Popular right now"
        seeAllTo="/movies"
        bar="bg-red-600"
        link="text-red-400"
        {...movies}
      />
      <Row
        title="Anime"
        subtitle="Top anime"
        seeAllTo="/anime"
        bar="bg-purple-600"
        link="text-purple-400"
        {...anime}
      />
      <Row
        title="Games"
        subtitle="Most popular games"
        seeAllTo="/games"
        bar="bg-teal-600"
        link="text-teal-400"
        {...games}
      />
    </div>
  );
}

export default Home;
