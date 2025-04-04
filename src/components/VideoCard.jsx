const VideoCard = ({ video, onSelect }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="video-card" onClick={() => onSelect(video)}>
            <div className="video-thumbnail">
                {/* Placeholder for thumbnail - you can replace with actual thumbnail if available */}
                <div className="thumbnail-placeholder">
                    <span>▶</span>
                </div>
            </div>
            <div className="video-info">
                <h3>{video.title}</h3>
                <p className="description">{video.description}</p>
                <p className="date">{formatDate(video.date)}</p>
            </div>
        </div>
    );
};

export default VideoCard;