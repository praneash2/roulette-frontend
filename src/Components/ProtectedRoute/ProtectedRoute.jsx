import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading

    useEffect(() => {
        // Check authentication status from localStorage
        const profile = localStorage.getItem('profile'); // Replace 'token' with your actual key
        if (profile) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        // Optionally, return a loading spinner or placeholder while checking authentication
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/auth" />;
    }

    // Otherwise, render the protected component
    return children;
};

export default ProtectedRoute;
