// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); // Use loading state if needed
    const location = useLocation();

    // Optional: Add a loading indicator while auth state is being determined
    // if (loading) {
    //     return <div>Loading...</div>; // Or a spinner component
    // }

    if (!isAuthenticated) {
        // Redirect them to the /login page, saving the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // Render the component if authenticated
};

export default ProtectedRoute;