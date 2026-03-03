import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaQuoteRight, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// --- Environment Variable for API ---
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function ResourcePage() {
  const { resourceId } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        // CHANGED: Using API_BASE_URL variable
        const res = await axios.get(`${API_BASE_URL}/api/resources/${resourceId}`);
        const actualData = res.data.data ? res.data.data : res.data;
        setResources(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [resourceId]);

  const getTitle = (id) => id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}><h2>Loading SoulHeal Resources...</h2></div>;

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <Link to="/dashboard" className="logo">SoulHeal</Link>
      </nav>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="content-header">
            <h2 className="section-title">{getTitle(resourceId)}</h2>
            <Link to="/dashboard" className="close-content"><FaTimes /></Link>
          </div>
          <div className="content-grid">
            {resources.length === 0 ? <p>No resources found for this category.</p> : 
              resources.map((item) => (
              <div key={item._id} className={`content-card ${resourceId === 'success-stories' ? 'success-story-card' : ''}`}>
                
                {/* Motivational Quotes Icon */}
                {resourceId === 'motivational-quotes' && <FaQuoteRight className="section-icon" />}
                
                {/* Images (Circle for experts, Square for others) */}
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className={resourceId === 'professionals' || resourceId === 'expert-directory' ? 'profile-image' : ''} 
                  />
                )}

                <h3>{item.title}</h3>

                {/* Success Stories Styling */}
                {resourceId === 'success-stories' ? (
                   <>
                     <p className="success-story-quote" style={{fontStyle: 'italic', margin: '15px 0'}}>"{item.description}"</p>
                     <p className="success-story-author" style={{fontWeight: 'bold'}}>- {item.author}</p>
                   </>
                ) : (
                   <>
                     {item.description && <p>{item.description}</p>}
                     {item.author && <p><i>- {item.author}</i></p>}
                   </>
                )}

                {/* Expert Metadata */}
                {item.metadata?.email && <p><FaEnvelope /> {item.metadata.email}</p>}
                {item.metadata?.phone && <p><FaPhone /> {item.metadata.phone}</p>}
                {item.metadata?.location && <p><FaMapMarkerAlt /> {item.metadata.location}</p>}

                {/* --- FIXED STUDY TECHNIQUES LIST --- */}
                {resourceId === 'study-techniques' && item.metadata?.steps && (
                  <ul style={{
                    textAlign: 'left', 
                    display: 'inline-block', 
                    margin: '20px auto 0', 
                    padding: '0',
                    listStyleType: 'none'
                  }}>
                    {item.metadata.steps.map((step, i) => (
                      <li key={i} style={{
                        marginBottom: '12px', 
                        display: 'flex', 
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '0.95rem',
                        color: '#4b5563'
                      }}>
                        <span style={{ 
                          color: '#2563eb', 
                          fontWeight: 'bold', 
                          fontSize: '1.2rem', 
                          lineHeight: '1' 
                        }}>•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Links */}
                {item.externalLink && (
                  <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="content-link">
                    {resourceId === 'books' ? 'Get Book' : resourceId === 'mood-games' ? 'Play Now' : 'Visit Profile'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcePage;