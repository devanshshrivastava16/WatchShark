# 🦈 WatchShark - Movie Streaming Website

A modern, responsive movie streaming website built with React that provides users with access to a vast collection of movies. WatchShark offers an intuitive interface for discovering, searching, and watching movies with seamless streaming capabilities.

## 🌐 Live Demo

**Deployed Site**: [https://watchshark.vercel.app/](https://watchshark.vercel.app/)

## 📱 Features

- **Extensive Movie Database**: Browse thousands of movies
- **Advanced Search**: Find movies quickly with intelligent search functionality
- **Movie Details**: Comprehensive information including cast, crew, ratings, and synopsis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Streaming**: High-quality video playback with multiple streaming sources
- **Personal Watchlist**: Save movies to watch later
- **Interactive UI**: Modern, clean interface with smooth animations
- **Real-time Data**: Up-to-date movie information and ratings

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: CSS3 with modern design principles
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **APIs**: 
  - TMDB API (Movie Database)
  - VidSrc API (Video Streaming)
  - 2Embed (Alternative Streaming Source)

## 📁 Project Structure

```
WATCHSHARK-MOVIE-APP/
├── node_modules/           # Dependencies
├── public/
│   └── favicon.png         # Site favicon
├── src/
│   ├── blocks/
│   │   ├── Backgrounds/    # Background components
│   │   └── Particles/      # Particle effects
│   │       └── Particles.jsx
│   ├── components/
│   │   └── MovieCard.jsx   # Reusable movie card component
│   ├── pages/
│   │   ├── Home.jsx        # Homepage
│   │   ├── MovieDetails.jsx # Movie detail page
│   │   ├── Player.jsx      # Video player page
│   │   ├── Search.jsx      # Search functionality
│   │   └── Watchlist.jsx   # User watchlist
│   ├── services/
│   │   └── tmdb.js         # TMDB API integration
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── styles.css          # Global styles
├── .env                    # Environment variables
├── index.html              # HTML template
├── jsrepo.json            # Repository configuration
├── package-lock.json      # Dependency lock file
└── package.json           # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devanshshrivastava16/WatchShark.git
   cd WatchShark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🔧 API Integration

### TMDB API
- Provides comprehensive movie data
- Includes ratings, cast information, and metadata
- Handles search functionality and trending content

### Streaming APIs
- **VidSrc API**: Primary streaming source
- **2Embed**: Alternative streaming option for better availability

## 📖 Usage

1. **Browse Movies**: Explore trending and popular movies on the homepage
2. **Search Content**: Use the search bar to find specific movies
3. **View Details**: Click on any movie card to see detailed information
4. **Watch Movies**: Click the play button to start streaming
5. **Manage Watchlist**: Add movies to your personal watchlist for later viewing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **GitHub Repository**: [https://github.com/devanshshrivastava16/WatchShark](https://github.com/devanshshrivastava16/WatchShark)
- **Live Application**: [https://watchshark.vervel.app/](https://watchshark.vercel.app/)

## 📞 Contact

**Developer**: Devansh Shrivastava
- GitHub: [@devanshshrivastava16](https://github.com/devanshshrivastava16)

## ⚖️ Legal Disclaimer

**Important Notice**: This project is created solely for educational purposes and to demonstrate web development skills using React.js and various APIs. 

- All movie data is sourced from publicly available APIs (TMDB)
- Streaming sources utilize publicly accessible embedding services
- This project does not host, store, or distribute any copyrighted content
- The owner/developer does not promote or encourage piracy in any form
- Users are responsible for ensuring they comply with their local laws regarding content consumption
- All content sources are already available on the internet through their respective platforms

This application serves as a portfolio project showcasing modern web development techniques and API integration capabilities.
