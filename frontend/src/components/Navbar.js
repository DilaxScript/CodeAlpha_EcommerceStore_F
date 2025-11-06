// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav style={{ 
      backgroundColor: '#333', 
      padding: '1rem', 
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>CodeAlpha Store</h2>
      </Link>
      
      <div>
        <Link to="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/products" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
          Products
        </Link>
        <Link to="/cart" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
          Cart
        </Link>
        
        {/* Admin Links */}
        {user && user.role === 'admin' && (
          <Link to="/admin/dashboard" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
            Admin Dashboard
          </Link>
        )}
        {!user && (
          <Link to="/admin/login" style={{ color: 'yellow', margin: '0 1rem', textDecoration: 'none' }}>
            Admin
          </Link>
        )}
        
        {user ? (
          <>
            <span style={{ margin: '0 1rem' }}>Hello, {user.name}</span>
            <button 
              onClick={handleLogout}
              style={{ 
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;