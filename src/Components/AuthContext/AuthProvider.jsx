import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

     // Function to handle authentication state
     const updateAuthentication = (status) => {
        setIsAuthenticated(status);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,updateAuthentication}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
