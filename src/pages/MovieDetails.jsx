import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, img } from "../services/tmdb";

function useWatchlist() {
  const key = "watchlist";
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  });
  const has = (id) => ids.includes(id);
  const add = (id) => {
    const next = Array.from(new Set([...ids, id]));
    setIds(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  const remove = (id) => {
    const next = ids.filter((x) => x !== id);
    setIds(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  return { ids, has, add, remove };
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recs, setRecs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const wl = useWatchlist();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [{ data: m }, { data: v }, { data: r }, { data: c }] =
        await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/videos`),
          api.get(`/movie/${id}/recommendations`),
          api.get(`/movie/${id}/credits`),
        ]);
      setMovie(m);
      setVideos(v.results || []);
      setRecs(r.results || []);
      setCredits(c);
      setLoading(false);
    }
    load().catch(console.error);
  }, [id]);

  const trailer = useMemo(
    () => videos.find((v) => v.type === "Trailer" && v.site === "YouTube"),
    [videos]
  );
  const director = useMemo(
    () => credits?.crew.find((person) => person.job === "Director"),
    [credits]
  );
  const stars = useMemo(
    () =>
      credits?.cast
        .slice(0, 5)
        .map((person) => person.name)
        .join(", "),
    [credits]
  );

  const overviewWords = movie?.overview?.split(" ") || [];
  const isLongOverview = overviewWords.length > 40;
  const displayedOverview =
    showFullOverview || !isLongOverview
      ? movie?.overview
      : overviewWords.slice(0, 40).join(" ") + "...";

  if (loading) return <p>Loading…</p>;
  if (!movie) return <p>Not found.</p>;

  const inList = wl.has(movie.id);

  return (
    <div>
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${img.original(movie.backdrop_path)})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="detail-title">{movie.title}</h1>
          <p className="kicker detail-info">
            {movie.release_date?.slice(0, 4)} • {movie.runtime}m •{" "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="kicker">Director: {director?.name || "N/A"}</p>
          <p className="kicker">Stars: {stars || "N/A"}</p>
          <p className="detail-overview">
            {displayedOverview}
            {isLongOverview && (
              <button
                className="read-more-btn"
                onClick={() => setShowFullOverview(!showFullOverview)}
              >
                {showFullOverview ? " Show less" : " Read more"}
              </button>
            )}
          </p>

          <div className="detail-buttons">
            <Link to={`/watch/movie/${movie.id}`} className="watch-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              WATCH NOW
            </Link>
            <button
              className="watchlist-btn"
              onClick={() => (inList ? wl.remove(movie.id) : wl.add(movie.id))}
            >
              {inList ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="section">
          <h2>Trailer</h2>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="section">
        <h2>Recommendations</h2>
        <div className="grid">
          {recs.slice(0, 12).map((r) => (
            <Link key={r.id} to={`/movie/${r.id}`} className="card">
              {r.poster_path ? (
                <img
                  src={img.poster(r.poster_path, 342)}
                  alt={r.title}
                  loading="lazy"
                />
              ) : (
                <div style={{ height: 240 }} />
              )}
              <div className="meta">
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "75%",
                  }}
                >
                  {r.title}
                </div>
                <span className="chip">
                  ★ {Number(r.vote_average || 0).toFixed(1)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
