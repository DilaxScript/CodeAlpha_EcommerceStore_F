// frontend/src/pages/AdminDashboard.js (Simple Version)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Debug info
  console.log('🔍 ADMIN DASHBOARD - USER:', user);
  console.log('🔍 ADMIN DASHBOARD - ROLE:', user?.role);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your role: <strong>{user.role}</strong></p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Admin Functions:</h3>
        <button style={{ padding: '1rem', margin: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
          Manage Products
        </button>
        <button style={{ padding: '1rem', margin: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          View Users
        </button>
        <button style={{ padding: '1rem', margin: '0.5rem', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
          View Orders
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;