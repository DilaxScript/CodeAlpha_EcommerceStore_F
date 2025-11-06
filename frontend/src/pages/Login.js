// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      const user = response.data.user;
      
      console.log('🔍 LOGIN RESPONSE:', response.data);
      console.log('👤 USER DATA:', user);
      console.log('👑 USER ROLE:', user.role);

      // Check if admin login attempt
      if (isAdminLogin && user.role !== 'admin') {
        alert('Access denied. Admin credentials required.');
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('💾 LOCAL STORAGE SET:', localStorage.getItem('user'));

      if (user.role === 'admin') {
        alert('Admin login successful!');
        window.location.href = '/admin/dashboard';
      } else {
        alert('Login successful!');
        window.location.href = '/';
      }
    } catch (error) {
      alert('Login failed! ' + (error.response?.data?.message || 'Try again'));
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
        <button 
          type="button"
          onClick={() => setIsAdminLogin(!isAdminLogin)}
          style={{
            backgroundColor: isAdminLogin ? '#dc3545' : '#6c757d',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
        </button>
      </div>

      {isAdminLogin && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          padding: '0.75rem',
          borderRadius: '5px',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <strong>Admin Credentials:</strong><br />
          Email: admin@codealpha.com<br />
          Password: admin123
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder={isAdminLogin ? "Admin Email" : "Email"}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            backgroundColor: isAdminLogin ? '#dc3545' : '#007bff',
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isAdminLogin ? 'Admin Login' : 'Login'}
        </button>
      </form>
      
      {!isAdminLogin && (
        <>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          
          {/* Forgot Password Link Added Here */}
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/admin/login" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
          Go to dedicated admin login
        </Link>
      </div>
    </div>
  );
};

export default Login;