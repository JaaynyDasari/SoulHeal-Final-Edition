// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user'); // Clear corrupted data
            return null;
        }
    });
    const [loading, setLoading] = useState(false); // Global loading state for auth actions

    const login = (token, userData) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthToken(token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        // Navigation happens in the component calling logout
    };

    // Initialize loading state based on initial token presence (optional)
    // useEffect(() => {
    //   setLoading(!authToken); // Example: Assume loading if no token initially
    // }, []);


    const value = {
        authToken,
        user,
        loading,
        setLoading, // Allow components to manage auth loading state
        login,
        logout,
        isAuthenticated: !!authToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};