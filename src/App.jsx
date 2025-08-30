import {
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Search from "./pages/Search.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Player from "./pages/Player.jsx";
import Particles from "./blocks/Backgrounds/Particles/Particles.jsx";

export default function App() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const term = form.get("q")?.toString().trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div>
      <Particles className="particles-bg" />
      <header className="header">
        <nav className="nav container">
          <Link to="/" className="metallic-text">
            <img src="/favicon.png" alt="Logo" width="80px" height="auto" />
            WatchShark
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <form className="searchbar" onSubmit={onSubmit}>
              <input name="q" placeholder="Search movies..." defaultValue={q} />
              <button type="submit">Search</button>
            </form>
            <Link to="/watchlist" className="pill">
              Watchlist
            </Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watch/:type/:id" element={<Player />} />
          <Route
            path="/watch/:type/:id/:season/:episode"
            element={<Player />}
          />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </main>
    </div>
  );
}
