import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!file || !title) {
            setMessage('Please provide a video file and title');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify({ title, description }));

        try {
            await axios.post('https://redes-back.cundacraft.me/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Video uploaded successfully!');
            setFile(null);
            setTitle('');
            setDescription('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error uploading file');
        }
    };

    return (
        <div className="upload-form">
            <h2>Upload Video</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title*:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Video description"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label>Video File*:</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload Video</button>
            </form>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        </div>
    );
};

export default UploadForm;