const VideoCard = ({ video, onSelect }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="video-card" onClick={() => onSelect(video)}>
            <div className="video-thumbnail">
                {/* Placeholder for thumbnail - replace with actual thumbnail if available */}
                <img
                    src={`https://via.placeholder.com/300x169/333/666?text=${encodeURIComponent(video.title)}`}
                    alt={video.title}
                />
                <div className="video-info">
                    <h3>{video.title}</h3>
                    <p className="description">{video.description}</p>
                    <p className="date">{formatDate(video.date)}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;