export default function VideoCard({ video }) {
  return (
    <div className="video-card">
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        allowFullScreen
      />

      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
  );
}