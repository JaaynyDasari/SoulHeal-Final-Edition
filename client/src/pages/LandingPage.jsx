// src/pages/LandingPage.jsx
import React from 'react'; // Make sure React is imported
import { Link } from 'react-router-dom'; // Import Link for navigation buttons


function HeartLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      width="40" 
      height="40"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function LandingPage() {
  
  return (
    <div className="container"> {/* Ensure container div wraps everything */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <HeartLogo />
          SoulHeal
        </Link>
        {/* Note: Login/Signup buttons are inside the hero section below in your original code */}
      </nav>

      <div className="hero">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=600"
            alt="Students supporting each other"
          />
        </div>
        <h1>Welcome to SoulHeal</h1>
        <p>
          Your journey to inner peace and mental wellness begins here. Join our
          community of mindful individuals seeking balance and growth.
        </p>
        <div className="hero-cta">Start your healing journey</div>
        {/* Login/Signup Buttons */}
        <div className="nav-buttons">
          <Link to="/login" className="button button-secondary">
            Log In
          </Link>
          <Link to="/signup" className="button button-primary">
            Sign Up
          </Link>
          
        </div>
        {/* Features Section */}
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">♡</div>
            <h3 className="feature-title">Mental Support</h3>
            <img
              src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=300&h=200"
              alt="Students in a support group"
              className="feature-image"
            />
            <p className="feature-description">
              Mental health and support for your emotional well-being,
              available 24/7 whenever you need it.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3 className="feature-title">Personal Growth</h3>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&h=200"
              alt="Students studying together"
              className="feature-image"
            />
            <p className="feature-description">
              Transform challenges into opportunities with proven strategies for
              self-discovery and development.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">Safe Community</h3>
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&h=200"
              alt="Students in a circle"
              className="feature-image"
            />
            <p className="feature-description">
              Join a nurturing community where you can share, learn, and grow
              with others on similar journeys.
            </p>
          </div>
        </div> {/* End features */}
      </div> {/* End hero */}
    </div>  
  );
}

export default LandingPage;