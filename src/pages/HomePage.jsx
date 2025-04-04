import { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const HomePage = ({ isAuthenticated }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/video', );
                setVideos(data.data);
                console.log(data.data[0].url);
            } catch (err) {
                setError('Failed to load videos. Please try again later.');
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <div className="loading">Loading videos...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="home-page">
            <h1>Video Library</h1>

            {selectedVideo ? (
                <>
                    <button className="back-button" onClick={() => setSelectedVideo(null)}>
                        ← Back to videos
                    </button>
                    <div className="video-details">
                        <h2>{selectedVideo.title}</h2>
                        <p className="date">Uploaded on: {new Date(selectedVideo.date).toLocaleDateString()}</p>
                        <p className="description">{selectedVideo.description}</p>
                    </div>
                    <VideoPlayer videoUrl={selectedVideo.url} />
                </>
            ) : (
                <>
                    {videos.length > 0 ? (
                        <div className="video-grid">
                            {videos.map((video) => (
                                <VideoCard
                                    key={video.url}
                                    video={video}
                                    onSelect={setSelectedVideo}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="no-videos">No videos available yet</p>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;