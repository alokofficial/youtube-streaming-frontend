import { useMemo, useState, useEffect } from "react";
import { videos } from "./data/videos";
import "./App.css";

const categories = ["All", ...new Set(videos.map((v) => v.category))];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [theme, setTheme] = useState("dark"); // 'dark' or 'light'
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Sync theme with body for background color if needed, or just let .app handle it.
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className={`app ${theme}`}>
      {/* Sidebar Playlist */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>Alok ❤️ Sneha</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            {showInstallPrompt && (
              <button className="install-btn" onClick={handleInstallClick}>
                Install App
              </button>
            )}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" style={{ height: "44px" }}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
          />
          
        </div>

        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="playlist">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`playlist-item ${
                activeVideo.id === video.id ? "active" : ""
              }`}
              onClick={() => setActiveVideo(video)}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                />
                <span className="video-duration">{video.duration}</span>
              </div>

              <div>
                <h4>{video.title}</h4>
                <p>{video.category}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Video Player */}
      <main className="player-section">
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.id}`}
            title={activeVideo.title}
            allowFullScreen
          />
        </div>

        <div className="video-info">
          <h1>{activeVideo.title}</h1>
          <p>{activeVideo.category}</p>
        </div>
      </main>
    </div>
  );
}