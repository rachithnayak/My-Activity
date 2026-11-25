import { Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/list" element={<MyList />} />
    </Routes>
  );
}

export default App;
