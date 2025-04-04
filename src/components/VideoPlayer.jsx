const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="video-player-container">
            <div className="video-wrapper">
                <video controls width="100%">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayer;