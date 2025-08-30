import { useEffect, useState } from 'react'
import { api } from '../services/tmdb'
import MovieCard from '../components/MovieCard'

export default function Watchlist() {
  const [ids, setIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('watchlist') || '[]') } catch { return [] }
  })
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function load() {
      const list = await Promise.all(ids.map(id => api.get(`/movie/${id}`).then(r => r.data).catch(() => null)))
      setMovies(list.filter(Boolean))
    }
    load().catch(console.error)
  }, [ids])

  if (ids.length === 0) return <p>Your watchlist is empty.</p>

  return (
    <div className="section">
      <h2>Watchlist</h2>
      <div className="grid">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}
