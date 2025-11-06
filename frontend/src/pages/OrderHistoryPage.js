// frontend/src/pages/OrderHistoryPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- CRITICAL: Import Link for navigation
import API from '../services/api';
import { getAuthInfo } from '../services/authService';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const userInfo = getAuthInfo();
      if (!userInfo) {
        setError('Please login to view your orders.');
        setLoading(false);
        return;
      }

      try {
        // Protected User Endpoint for personal orders
        const { data } = await API.get('/orders/myorders'); 
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Your session may have expired.');
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  // --- LOADER IMPLEMENTATION FIX ---
  if (loading) return (
    <div className='loader-container'><div className='loader'></div></div>
  );
  // --- END LOADER FIX ---

  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div className='order-list'>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* Shortened Unique ID for cleaner table view */}
                <td>{`${order._id.substring(0, 8)}...${order._id.slice(-3)}`}</td> 
                <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td> 
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? '✅ Paid' : '❌ Pending'}</td>
                <td>
                  {/* CRITICAL FIX: Use Link to navigate to the new Order Details Page */}
                  <Link 
                    to={`/orders/${order._id}`} 
                    className='btn-primary' 
                    style={{ padding: '5px 10px', fontSize: '0.8em' }}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryPage;