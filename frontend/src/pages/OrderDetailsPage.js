// frontend/src/pages/OrderDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const OrderDetailsPage = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Protected endpoint for a single order
        const { data } = await API.get(`/orders/${id}`); 
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details. Access denied or order not found.');
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className='loader-container'><div className='loader'></div></div>
  );
  
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  // Ensure products array exists before mapping
  const orderItems = order.orderItems || [];

  return (
    <div className='order-details'>
      <h1>Order Details: {order._id}</h1>
      <p>Status: **{order.isPaid ? 'Paid' : 'Pending'}**</p>
      <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      
      <h3>Order Items ({orderItems.length})</h3>
      <div className='cart-items-list'> 
        {orderItems.map((item, index) => (
          <div key={index} className='cart-item'>
            {/* Placeholder for image display (Requires image helper and URL fix applied here) */}
            <p>Product: {item.name}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>

      <div className='cart-summary' style={{ textAlign: 'left' }}>
          <h2>Total: **${order.totalPrice.toFixed(2)}**</h2>
      </div>
    </div>
  );
};

export default OrderDetailsPage;