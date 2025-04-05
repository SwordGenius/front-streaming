import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = ({ type }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: type === 'register' ? '' : undefined
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = type === 'login' ? 'https://redes-back.cundacraft.me/users/login' : 'https://redes-back.cundacraft.me/users';
            const { data } = await axios.post(url, formData);

            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h1 className="auth-form-title">
                    {type === 'login' ? 'Sign In' : 'Register'}
                </h1>
                {error && <div className="auth-error">{error}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {type === 'register' && (
                        <input
                            className="auth-form-input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        className="auth-form-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="auth-form-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="auth-form-button">
                        {type === 'login' ? 'Sign In' : 'Register'}
                    </button>
                    <div className="auth-form-help">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/">Need help?</a>
                    </div>
                </form>
                <p className="auth-form-signup">
                    {type === 'login' ? (
                        <>
                            New to Streamly? <a href="/register">Sign up now</a>.
                        </>
                    ) : (
                        <>
                            Already have an account? <a href="/login">Sign in now</a>.
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;;