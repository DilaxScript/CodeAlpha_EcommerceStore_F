// frontend/src/pages/PlaceOrderPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getAuthInfo } from '../services/authService';
import API from '../services/api';

const PlaceOrderPage = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalPrice = subtotal; // Assuming no tax/shipping for simplicity

  const placeOrderHandler = async () => {
    const userInfo = getAuthInfo();
    if (!userInfo) {
        navigate('/login'); // Redirect if not logged in
        return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.images ? item.images[0] : item.image, // Use images[0] or fallback
            price: item.price,
            product: item.product, 
        })),
        totalPrice: totalPrice,
      };

      // POST request to the protected order creation endpoint
      // We don't need the 'data' variable, so we don't declare it (avoids ESLint warning)
      await API.post('/orders', orderData); 

      // Success: Clear the cart and navigate to the order history/details
      dispatch({ type: 'CLEAR_CART' }); 
      setLoading(false);
      navigate(`/orders`); // Navigate to the view past orders page

    } catch (err) {
      setError(err.response?.data?.message || 'Order placement failed.');
      setLoading(false);
    }
  };

  return (
    <div className='place-order' style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Order Summary</h1>
      
      {/* Display errors */}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      
      {/* 1. Order Items List */}
      <div className='cart-items-list' style={{ marginBottom: '20px' }}>
        <h3>Items to Purchase:</h3>
        {cartItems.map(item => (
            <div key={item.product} className='cart-item' style={{ padding: '10px 0', borderBottom: '1px solid #eee', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: '600', color: '#34495e' }}>
                    {item.name}
                </div>
                <div>
                    {item.qty} x ${item.price.toFixed(2)} 
                </div>
                <div style={{ fontWeight: '700' }}>
                    = ${(item.qty * item.price).toFixed(2)}
                </div>
            </div>
        ))}
      </div>
      
      {/* 2. Order Totals Summary Box */}
      <div className='cart-summary'>
        <h2>Summary ({cartItems.length} Items)</h2>
        <div className='order-totals'>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: $0.00 (Free)</p>
            <p style={{ fontSize: '1.4em', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                **Order Total: ${totalPrice.toFixed(2)}**
            </p>
        </div>
        
        {/* 3. Place Order Button (Using global CSS class) */}
        <button 
            onClick={placeOrderHandler} 
            disabled={cartItems.length === 0 || loading}
            className='btn-success' 
            style={{ width: '100%', marginTop: '20px' }}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
      
    </div>
  );
};

export default PlaceOrderPage;