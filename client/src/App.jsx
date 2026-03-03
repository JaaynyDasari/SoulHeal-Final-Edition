// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Link, Navigate (not used directly here)
// Removed useState as it's not used here anymore
import './App.css';
import Dashboard from './Dashboard.jsx';
import ResourcePage from './ResourcePage.jsx';
import LandingPage from './pages/LandingPage.jsx'; // Import LandingPage
import LoginPage from './pages/LoginPage.jsx';     // Import LoginPage
import SignupPage from './pages/SignupPage.jsx';   // Import SignupPage
import ProtectedRoute from './components/ProtectedRoute.jsx'; // We will create this next

// Removed HeartLogo, LandingPage, Login, SignUp function definitions from here

function App() {
  return (
    // Router is already wrapped in AuthProvider in main.jsx
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute> {/* Wrap Dashboard */}
                    <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/resources/:resourceId"
            element={
                 <ProtectedRoute> {/* Also protect resource pages */}
                    <ResourcePage />
                </ProtectedRoute>
            }
         />
      </Routes>
    </Router>
  )
}

export default App;