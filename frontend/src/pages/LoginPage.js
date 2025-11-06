// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- CRITICAL: Import Link here
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const { loginUser, setWelcomeMessage } = useAuth(); 

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await login(email, password); 

      loginUser(userData);
      setWelcomeMessage(userData.name); 
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed'); 
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
          />
        </div>
        
        <div style={{ marginBottom: '5px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', fontSize: '0.9em' }}>
            <input
                type='checkbox'
                id='show-password'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ width: 'auto', marginRight: '8px' }}
            />
            <label htmlFor='show-password'>Show Password</label>
        </div>
        
        <button 
          type='submit'
          className='btn-primary' 
          style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Sign In
        </button>
      </form>

      {/* --- CRITICAL UX FIX: Link to Registration Page --- */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em' }}>
          <p>
              Don't have an account? 
              <Link to='/register' style={{ marginLeft: '5px', color: '#1abc9c', fontWeight: 'bold' }}>
                  Register Here
              </Link>
          </p>
      </div>
    </div>
  );
};

export default LoginPage;