// frontend/src/services/authService.js
import API from './api'; // Assuming './api' contains the Axios instance

// Function to store user info and JWT in local storage
const setAuthInfo = (data) => {
  localStorage.setItem('userInfo', JSON.stringify(data));
};

// Function to retrieve user info
export const getAuthInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

// Function for user login
export const login = async (email, password) => {
  const { data } = await API.post('/users/login', { email, password });
  setAuthInfo(data);
  return data;
};

// Function for user registration
export const register = async (name, email, password) => {
  const { data } = await API.post('/users', { name, email, password });
  setAuthInfo(data);
  return data;
};

// Function for user logout
export const logout = () => {
  localStorage.removeItem('userInfo');
  // You might want to reload the page or update global state here
  window.location.href = '/login'; 
};

// Simple check for admin role
export const isAdmin = () => {
    const userInfo = getAuthInfo();
    return userInfo && userInfo.role === 'admin';
};