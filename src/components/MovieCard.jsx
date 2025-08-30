import { Link } from "react-router-dom";
import { img } from "../services/tmdb"; // 🆕 Corrected import path

export default function MovieCard({ movie }) {
  const poster = img.poster(movie.poster_path, 342);

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} title={movie.title}>
        {/* 🆕 Use an aspect ratio container for the image */}
        <div className="poster-container">
          {poster ? (
            <img src={poster} alt={movie.title} loading="lazy" />
          ) : (
            <div className="placeholder" />
          )}
        </div>
      </Link>

      <div className="meta">
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "75%",
          }}
        >
          {movie.title}
        </div>
        <span className="chip">
          ★ {Number(movie.vote_average || 0).toFixed(1)}
        </span>
      </div>
    </div>
  );
}
