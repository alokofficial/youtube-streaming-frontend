import { useMemo, useState } from "react";
import { videos } from "./data/videos";
import "./App.css";

const categories = ["All", ...new Set(videos.map((v) => v.category))];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="app">
      {/* Sidebar Playlist */}
      <aside className="sidebar">
        <h2>Playlist</h2>

        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

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