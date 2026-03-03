// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Optional: Add confirmPassword state if desired
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // For success message
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Optional: Add password confirmation check
        // if (password !== confirmPassword) {
        //     setError("Passwords do not match!");
        //     return;
        // }

        setLoading(true);
        const apiUrl = 'http://localhost:5001/api/auth/signup'; // Your backend URL

        try {
            const response = await axios.post(apiUrl, { email, password });

            setSuccess(response.data.message + ' Redirecting to login...'); // Show success message
            setLoading(false);

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 2-second delay

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

                    {/* Remove Name, Age, Course fields for now */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-email"> {/* Changed id */}
                            Email
                        </label>
                        <input
                            type="email"
                            id="signup-email" // Changed id
                            name="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-password"> {/* Changed id */}
                            Password (min 6 characters)
                        </label>
                        <input
                            type="password"
                            id="signup-password" // Changed id
                            name="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength="6" // Add minLength attribute
                        />
                    </div>
                    
                    {/* Optional: Add Confirm Password field */}
                    {/* <div className="form-group">
                        <label className="form-label" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div> */}
                    
                    <button type="submit" className="form-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <Link to="/" className="back-link">
                    Back to Home
                </Link>
                 {/* Optional: Link to Login */}
                 <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;