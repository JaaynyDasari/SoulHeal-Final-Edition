import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import {
    FaYoutube, FaBook, FaInstagram, FaQuoteRight, FaLightbulb, FaGamepad, FaUserMd, FaStar,
    FaSmile, FaUser, FaRobot, FaPaperPlane, FaTimes, FaComments, FaSignOutAlt
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

// --- Environment Variable for API ---
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const contextQuestions = [
    { key: 'userName', question: "I'm SoulHeal AI. First, what name would you like me to call you?" },
    { key: 'course', question: "Nice to meet you! What are you studying, and how has that been going lately?" },
    { key: 'challenges', question: "What’s been weighing on your mind or causing you stress recently?" },
    { key: 'happiness', question: "And finally, what usually brings you joy or helps you relax?" }
];

function ChatBot({ isOpen, onClose }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { type: 'bot', content: "Hello! I'm SoulHeal AI. Would you like to share a bit about yourself so I can support you better? Type **'yes'** or just ask me anything." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const [isGatheringContext, setIsGatheringContext] = useState(false);
    const [currentContextQuestionIndex, setCurrentContextQuestionIndex] = useState(0);
    const [userContextDetails, setUserContextDetails] = useState({ 
        userName: '', 
        course: '', 
        challenges: '', 
        happiness: '' 
    });
    const [hasProvidedContext, setHasProvidedContext] = useState(false);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

    const isSharingProblem = (text) => {
        const keywords = ['feel', 'sad', 'stressed', 'anxious', 'help', 'problem', 'not well', 'depressed', 'worried'];
        return text.length > 30 || keywords.some(word => text.toLowerCase().includes(word));
    };

    const handleContextAnswer = (answer) => {
        const currentKey = contextQuestions[currentContextQuestionIndex].key;
        const nextIndex = currentContextQuestionIndex + 1;
        const updatedDetails = { ...userContextDetails, [currentKey]: answer };
        setUserContextDetails(updatedDetails);

        if (nextIndex < contextQuestions.length) {
            setCurrentContextQuestionIndex(nextIndex);
            setMessages(prev => [...prev, { type: 'bot', content: contextQuestions[nextIndex].question }]);
        } else {
            setIsGatheringContext(false);
            setHasProvidedContext(true);
            setMessages(prev => [...prev, { type: 'bot', content: `Thank you for sharing, **${updatedDetails.userName || 'friend'}**. I'm here to listen. What's on your mind right now?` }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        setMessages(prev => [...prev, { type: 'user', content: trimmedInput }]);
        setInput('');

        if (!hasProvidedContext && !isGatheringContext && (trimmedInput.toLowerCase() === 'yes' || trimmedInput.toLowerCase() === 'yup')) {
            setIsGatheringContext(true);
            setMessages(prev => [...prev, { type: 'bot', content: contextQuestions[0].question }]);
            return;
        }

        if (isGatheringContext && isSharingProblem(trimmedInput)) {
            setIsGatheringContext(false);
            setHasProvidedContext(true);
        } 
        else if (isGatheringContext) {
            handleContextAnswer(trimmedInput);
            return;
        }

        setIsLoading(true);
        try {
            // CHANGED: Using API_BASE_URL variable
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: trimmedInput,
                context: userContextDetails
            });
            setMessages(prev => [...prev, { type: 'bot', content: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', content: "I'm having a little trouble connecting. Please try again?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="sh-chat-window">
            <div className="sh-chat-header">
                <div className="sh-chat-header-info">
                    <div className="sh-bot-avatar"><FaRobot /></div>
                    <div>
                        <div className="sh-bot-name">SoulHeal AI</div>
                        <div className="sh-bot-status">Online • Supportive Companion</div>
                    </div>
                </div>
                <button className="sh-close-btn" onClick={onClose}><FaTimes /></button>
            </div>

            <div className="sh-chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`sh-msg-row ${msg.type}`}>
                        <div className="sh-msg-bubble">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="sh-msg-row bot">
                        <div className="sh-msg-bubble loading-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="sh-chat-input-area" onSubmit={handleSubmit}>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isGatheringContext ? "Answer or share what's wrong..." : "Talk to SoulHeal AI..."} 
                />
                <button type="submit" disabled={isLoading}><FaPaperPlane /></button>
            </form>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [currentJoke, setCurrentJoke] = useState('');
    const [showJoke, setShowJoke] = useState(false);

    const jokes = [ 
        "Why don't scientists trust atoms? Because they make up everything!", 
        "What did the grape say when it got stepped on? Nothing, it just let out a little wine!", 
        "Why did the scarecrow win an award? Because he was outstanding in his field!", 
        "What do you call a bear with no teeth? A gummy bear!", 
        "Why don't eggs tell jokes? They'd crack up!", 
        "What do you call a fake noodle? An impasta!" 
    ];

    const getRandomJoke = () => { 
        const randomIndex = Math.floor(Math.random() * jokes.length); 
        setCurrentJoke(jokes[randomIndex]); 
        setShowJoke(true); 
        setTimeout(() => setShowJoke(false), 5000); 
    };

    const handleSectionClick = (section) => { navigate(`/resources/${section}`); };
    const handleLogout = () => { logout(); setShowUserInfo(false); navigate('/login'); };
    const currentUser = user || { id: null, email: "Guest" };

    return (
        <div className="dashboard">
             <nav className="dashboard-nav">
                 <div className="nav-left"> 
                    <Link to="/dashboard" className="logo"> 
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="40" height="40"> 
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /> 
                        </svg> SoulHeal 
                    </Link> 
                 </div>
                 <div className="nav-right"> 
                    <button onClick={getRandomJoke} className="stress-relief-button"> <FaSmile /> Instant Mood Boost </button> 
                    <div className="user-profile"> 
                        <button className="user-button" onClick={() => setShowUserInfo(!showUserInfo)} title={currentUser.email}> 
                            {currentUser.email && currentUser.email !== "Guest" ? currentUser.email.charAt(0).toUpperCase() : <FaUser />} 
                        </button> 
                        {showUserInfo && ( 
                            <div className="user-dropdown"> 
                                <h3>{currentUser.email}</h3> 
                                <button onClick={handleLogout} className="button button-secondary" style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}> 
                                    <FaSignOutAlt /> Logout 
                                </button> 
                            </div> 
                        )} 
                    </div> 
                 </div>
             </nav>

             {showJoke && ( 
                <div className="joke-popup" style={{ position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '1rem 2rem', borderRadius: '10px', zIndex: 1100, textAlign: 'center' }}> 
                    <FaSmile style={{ marginRight: '10px' }} /> {currentJoke} 
                </div> 
             )}

             <div className="dashboard-content">
                 <div className="dashboard-grid">
                     <div className="dashboard-section"> 
                        <h2 className="section-title">Resource Library</h2> 
                        <div className="section-grid"> 
                            <button className="section-card" onClick={() => handleSectionClick('mental-health-videos')}> 
                                <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=300&h=200" alt="Mental Health Videos" className="section-image" /> 
                                <FaYoutube className="section-icon" /> <h3>Mental Health Videos</h3> <p>Explore curated videos aiding mental well-being.</p> 
                            </button> 
                            <button className="section-card" onClick={() => handleSectionClick('professionals')}> 
                                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=300&h=200" alt="Mental Health Professionals" className="section-image" /> 
                                <FaInstagram className="section-icon" /> <h3>Mental Health Professionals</h3> <p>Hear valuable insights from experts.</p> 
                            </button> 
                            <button className="section-card" onClick={() => handleSectionClick('motivational-quotes')}> 
                                <img src="https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=300&h=200" alt="Motivational Quotes" className="section-image" /> 
                                <FaQuoteRight className="section-icon" /> <h3>Motivational Quotes</h3> <p>Your daily dose of inspiration.</p> 
                            </button> 
                            <button className="section-card" onClick={() => handleSectionClick('books')}> 
                                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&h=200" alt="Book Recommendations" className="section-image" /> 
                                <FaBook className="section-icon" /> <h3>Book Recommendations</h3> <p>Words that heal and stories that inspire.</p> 
                            </button> 
                        </div> 
                     </div>
                     <div className="dashboard-section"> 
                        <h2 className="section-title">We've got you covered!</h2> 
                        <div className="section-grid"> 
                            <button className="section-card" onClick={() => handleSectionClick('success-stories')}> 
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&h=200" alt="Success Stories" className="section-image" /> 
                                <FaStar className="section-icon" /> <h3>Success Stories</h3> <p>Inspiring journeys of overcoming challenges.</p> 
                            </button> 
                            <button className="section-card" onClick={() => handleSectionClick('study-techniques')}> 
                                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&h=200" alt="Study Techniques" className="section-image" /> 
                                <FaLightbulb className="section-icon" /> <h3>Study Techniques</h3> <p>Enhance focus and productivity.</p> 
                            </button> 
                            <button className="section-card" onClick={() => handleSectionClick('mood-games')}> 
                                <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=300&h=200" alt="Mood Boosting Games" className="section-image" /> 
                                <FaGamepad className="section-icon" /> <h3>Mood Boosting Games</h3> <p>Engaging games to lift your spirits.</p> 
                            </button> 
                        </div> 
                     </div>
                     <div className="dashboard-section"> 
                        <h2 className="section-title">Expert Directory</h2> 
                        <div className="section-grid"> 
                            <button className="section-card" onClick={() => handleSectionClick('expert-directory')}> 
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=200" alt="Expert Directory" className="section-image" /> 
                                <FaUserMd className="section-icon" /> <h3>Find an Expert</h3> <p>Connect with mental health professionals.</p> 
                            </button> 
                        </div> 
                     </div>
                 </div>
            </div>
             <button className="chatbot-trigger" onClick={() => setShowChatbot(true)}> <FaComments /> </button>
             <ChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
         </div>
    );
}

export default Dashboard;