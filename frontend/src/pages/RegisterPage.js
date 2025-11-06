// frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // CRITICAL: Import Link here
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext'; // Import useAuth to set welcome message

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Get Auth Context functions
  const { loginUser, setWelcomeMessage } = useAuth(); 

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null); 

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // 1. Register and get user data
      const userData = await register(name, email, password);
      
      // 2. Update global state and set welcome message
      loginUser(userData);
      setWelcomeMessage(userData.name);

      // 3. Redirect to home page
      navigate('/');
    } catch (err) {
      // Accessing response message from backend
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2>Register</h2>
      {message && <p style={{ color: message.includes('failed') || message.includes('match') ? 'red' : 'green' }}>{message}</p>}

      <form onSubmit={submitHandler}>
        {/* Input fields for Name, Email, Password, Confirm Password remain here */}
        
        {/* Name Input */}
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label>
          <input
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        {/* Email Input */}
        <div style={{ marginBottom: '10px' }}>
          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password Input (You should add the show/hide password toggle here too for consistency!) */}
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Confirm Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type='submit' className='btn-primary' style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Register
        </button>
      </form>

      {/* --- CRITICAL UX FIX: Link to Login Page --- */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em' }}>
          <p>
              Already have an account? 
              <Link to='/login' style={{ marginLeft: '5px', color: '#1abc9c', fontWeight: 'bold' }}>
                  Login Instead
              </Link>
          </p>
      </div>
    </div>
  );
};

export default RegisterPage;