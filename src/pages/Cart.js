// frontend/src/pages/Cart.js
import React from 'react';

const Cart = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '2rem', 
        textAlign: 'center',
        borderRadius: '5px'
      }}>
        <h3>🛒 Your cart is empty</h3>
        <p>Add some products to your cart to see them here!</p>
        <a 
          href="/products" 
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.5rem 1rem',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
            marginTop: '1rem'
          }}
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default Cart;