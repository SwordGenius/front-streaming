import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type, setIsAuthenticated, setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
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
            const url = type === 'login' ? 'http://localhost:3001/users/login' : 'http://localhost:3001/users';
            const { data } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                credentials: 'include',
            });

            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            if (type === 'login') {
                navigate('/');
            }
            if (type === 'register') {
                navigate('/login');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="auth-form">
            <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {type === 'register' && (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
};

export default AuthForm;