// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to CodeAlpha E-Commerce Store</h1>
      <p>Your one-stop shop for all your needs!</p>
      
      <div style={{ margin: '2rem 0' }}>
        <Link 
          to="/products" 
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem'
          }}
        >
          Start Shopping
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>🛒 Easy Shopping</h3>
          <p>Browse through our wide range of products</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>🔐 Secure Checkout</h3>
          <p>Safe and secure payment process</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick delivery to your doorstep</p>
        </div>
      </div>
    </div>
  );
};

export default Home;