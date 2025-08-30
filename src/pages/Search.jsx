import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const { search } = useLocation();
  const q = useMemo(() => new URLSearchParams(search).get("q") ?? "", [search]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let stop = false;
    async function run() {
      if (!q) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get("/search/movie", {
          params: { query: q, include_adult: false },
        });
        if (!stop) {
          setResults(data.results || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!stop) setLoading(false);
      }
    }
    run();
    return () => {
      stop = true;
    };
  }, [q]);

  if (!q) return <p>Type something in the search box above.</p>;
  if (loading) return <p>Searching…</p>;

  return (
    <div className="section">
      <h2>Results for “{q}”</h2>
      {results.length === 0 ? (
        <p>No results.</p>
      ) : (
        <div className="grid">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
