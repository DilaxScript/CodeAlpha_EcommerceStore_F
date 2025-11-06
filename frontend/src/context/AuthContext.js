// frontend/src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { getAuthInfo, logout as authLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initial state reads from localStorage
  const [user, setUser] = useState(getAuthInfo()); 
  
  // NEW STATE: To hold temporary flash messages (e.g., "Welcome back!")
  const [flashMessage, setFlashMessage] = useState(null); 

  // Function to update user state after successful login/register
  const loginUser = (userInfo) => {
    setUser(userInfo);
  };

  // Function to clear user state after logout
  const logoutUser = () => {
    authLogout(); // Clears localStorage
    setUser(null);
  };
  
  // NEW FUNCTION: Sets the welcome message and clears it after 4 seconds
  const setWelcomeMessage = (name) => {
      setFlashMessage(`Welcome back, ${name}!`);
      // Message disappears after 4 seconds for a clean UI
      setTimeout(() => setFlashMessage(null), 4000); 
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loginUser, 
        logoutUser,
        // CRITICAL FIX: Include message state and setter here
        flashMessage, 
        setWelcomeMessage 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};