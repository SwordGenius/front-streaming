import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

const HomePage = ({ isAuthenticated }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await axios.get('https://redes-back.cundacraft.me/video');
                setVideos(data.data);
            } catch (err) {
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();



    }, []);

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="app">

            <div className="main-content">

                <div className="hero-banner" style={{ backgroundImage: "linear-gradient(to right, rgba(20, 20, 20, 0.8) 0%, rgba(20, 20, 20, 0) 100%), url('https://via.placeholder.com/1920x1080')" }}>
                    <h1 className="hero-title">Premium Content</h1>
                    <p className="hero-description">Watch exclusive videos only available on our platform. Anytime, anywhere.</p>
                    {isAuthenticated ? (
                        <button className="hero-button">Watch Now</button>
                    ) : (
                        <button className="hero-button" onClick={() => window.location.href = '/register'}>Join Now</button>
                    )}
                </div>


                <div className="video-rows">
                    <h2 className="section-title">Popular on Streamly</h2>
                    <div className="video-grid">
                        {videos.slice(0, 6).map((video) => (
                            <VideoCard
                                key={video.url}
                                video={video}
                                onSelect={setSelectedVideo}
                            />
                        ))}
                    </div>

                    <h2 className="section-title">Recently Added</h2>
                    <div className="video-grid">
                        {videos.slice(6, 12).map((video) => (
                            <VideoCard
                                key={video.url}
                                video={video}
                                onSelect={setSelectedVideo}
                            />
                        ))}
                    </div>

                    <h2 className="section-title">Trending Now</h2>
                    <div className="video-grid">
                        {videos.slice(12, 18).map((video) => (
                            <VideoCard
                                key={video.url}
                                video={video}
                                onSelect={setSelectedVideo}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {selectedVideo && (
                <div className="video-modal">
                    <button
                        className="video-modal-close"
                        onClick={() => setSelectedVideo(null)}
                    >
                        &times;
                    </button>
                    <div className="video-modal-content">
                        <div className="video-player-container">
                            <video controls autoPlay>
                                <source src={selectedVideo.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="video-modal-info">
                            <h2>{selectedVideo.title}</h2>
                            <p>{selectedVideo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;