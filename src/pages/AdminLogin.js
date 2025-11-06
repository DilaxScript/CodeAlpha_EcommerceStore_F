// frontend/src/pages/AdminLogin.js
import React, { useState } from 'react';
import { authAPI } from '../services/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: 'admin@codealpha.com',
    password: 'admin123'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      const user = response.data.user;
      
      console.log('🔍 ADMIN LOGIN RESPONSE:', user);
      
      if (user.role !== 'admin') {
        alert('This user is not an admin!');
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      alert('Admin login successful! Redirecting to dashboard...');
      window.location.href = '/admin/dashboard';
      
    } catch (error) {
      alert('Admin login failed: ' + (error.response?.data?.message || 'Check credentials'));
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #dc3545',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#dc3545' }}>Admin Login</h2>
      <p><strong>Test Credentials:</strong></p>
      <p>Email: admin@codealpha.com</p>
      <p>Password: admin123</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Admin Email"
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
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Admin Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;