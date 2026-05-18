import { useMemo, useState } from "react";
import { videos } from "./data/videos";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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

        <div className="playlist">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`playlist-item ${
                activeVideo.id === video.id ? "active" : ""
              }`}
              onClick={() => setActiveVideo(video)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
              />

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