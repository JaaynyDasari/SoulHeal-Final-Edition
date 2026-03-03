// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const apiUrl = 'http://localhost:5001/api/auth/login'; 

        try {
const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);

            
            login(response.data.token, response.data.user);

            setLoading(false);
            navigate('/dashboard'); 

        } catch (err) {
            console.error('Login failed:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-image">
                    <img
                        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&h=200"
                        alt="Student studying peacefully"
                    />
                </div>
                <h2 className="auth-title">Log In to SoulHeal</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-email"> {/* Changed id */}
                            Email
                        </label>
                        <input
                            type="email"
                            id="login-email" 
                            name="email"    
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-password"> {/* Changed id */}
                            Password
                        </label>
                        <input
                            type="password"
                            id="login-password" // Changed id
                            name="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Direct state update
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
                <Link to="/" className="back-link">
                    Back to Home
                </Link>
                {/* Optional: Link to Signup */}
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: '600' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;