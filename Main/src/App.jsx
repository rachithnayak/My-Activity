import { Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import Anime from "./pages/Anime";
import AnimeDetails from "./pages/AnimeDetails";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <main className="pb-20 md:pb-0 md:pl-24">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/list" element={<MyList />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
