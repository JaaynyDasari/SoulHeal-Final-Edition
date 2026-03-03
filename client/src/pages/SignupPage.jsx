// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// This handles deployment vs local automatically
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // FIX: We create the object using your state variables (email, password)
            const signupData = { email, password };

            // FIX: Changed formData to signupData
            const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, signupData);

            setSuccess(response.data.message + ' Redirecting to login...'); 
            setLoading(false);

            setTimeout(() => {
                navigate('/login');
            }, 2000); 

        } catch (err) {
            console.error('Signup failed:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-image">
                    <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&h=200"
                        alt="Students collaborating"
                    />
                </div>
                <h2 className="auth-title">Sign Up for SoulHeal</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>{success}</p>}

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-email">Email</label>
                        <input
                            type="email"
                            id="signup-email"
                            name="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-password">Password (min 6 characters)</label>
                        <input
                            type="password"
                            id="signup-password"
                            name="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength="6"
                        />
                    </div>
                    
                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <Link to="/" className="back-link">Back to Home</Link>
                 <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;