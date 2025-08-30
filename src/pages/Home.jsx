import { useEffect, useState, useRef } from "react";
import { api, img, paginate } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [hero, setHero] = useState(null);
  const [popular, setPopular] = useState([]);
  const [top, setTop] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [p, t, tr] = await Promise.all([
        api.get("/movie/popular"),
        api.get("/movie/top_rated"),
        api.get("/trending/movie/week"),
      ]);
      setPopular(p.data.results);
      setTop(t.data.results);
      setTrend(tr.data.results);
      setHero(p.data.results?.[0]);
      setLoading(false);
    }
    load().catch(console.error);
  }, []);

  useEffect(() => {
    if (popular.length > 0) {
      setHero(popular[bannerIndex]);
    }
  }, [bannerIndex, popular]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex(
        (prevIndex) =>
          (prevIndex + 1) % (popular.length > 0 ? popular.length : 1)
      );
    }, 5000); // Change banner every 5 seconds
    return () => clearInterval(interval);
  }, [popular.length]);

  const handleBannerScroll = (direction) => {
    setBannerIndex((prevIndex) => {
      const newIndex =
        direction === "left"
          ? (prevIndex - 1 + popular.length) % popular.length
          : (prevIndex + 1) % popular.length;
      return newIndex;
    });
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      {hero && (
        <section className="hero section" style={{ position: "relative" }}>
          <img
            src={img.backdrop(hero.backdrop_path, 780)}
            alt={hero.title}
            style={{ width: "100%", borderRadius: 16 }}
          />
          <div className="banner-arrows">
            <button
              className="arrow-btn"
              onClick={() => handleBannerScroll("left")}
            >
              &#8249;
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleBannerScroll("right")}
            >
              &#8250;
            </button>
          </div>
          <div className="hero-content-overlay">
            <h1 style={{ marginTop: 0 }}>{hero.title}</h1>
            <p className="kicker">
              {hero.release_date?.slice(0, 4)} • ★{" "}
              {Number(hero.vote_average).toFixed(1)}
            </p>
            <p style={{ lineHeight: 1.6 }}>{hero.overview}</p>
            <Link to={`/movie/${hero.id}`} className="watch-btn-small">
              More Info
            </Link>
          </div>
        </section>
      )}

      <Row title="Trending" items={paginate(trend, 20)} />
      <Row title="Popular" items={paginate(popular, 20)} />
      <Row title="Top Rated" items={paginate(top, 20)} />
    </div>
  );
}

function Row({ title, items }) {
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const { scrollLeft, clientWidth } = scrollerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="section" style={{ position: "relative" }}>
      <div className="rowhead">
        <h2>{title}</h2>
        <span className="badge">{items.length} items</span>
        <div className="arrow-buttons">
          <button className="arrow-btn" onClick={() => scroll("left")}>
            &#8249;
          </button>
          <button className="arrow-btn" onClick={() => scroll("right")}>
            &#8250;
          </button>
        </div>
      </div>
      <div className="scroller" ref={scrollerRef}>
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
