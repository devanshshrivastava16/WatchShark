# TMDB Movie App (React + Vite)

A sleek movie browsing app using [TMDB](https://www.themoviedb.org/) API.

## Features
- Browse Popular, Top Rated and Trending
- Movie details with trailer (YouTube), genres, runtime, rating
- Smart search with debounced input
- Add/remove from Watchlist (localStorage)
- Responsive grid UI, keyboard-friendly
- Client routing with React Router

## Setup
1. **Unzip** the project.
2. Run:
   ```bash
   npm i
   cp .env.example .env
   # edit .env and set VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
   npm run dev
   ```
3. Open the shown local URL.

> TMDB requires an API key. Create one in your TMDB account, then put it in `.env`.

## Notes
- This is a client-side demo (no authentication). You can plug in your own backend/watch-history later.
- Thumbnails/posters are from TMDB's images CDN.
