// frontend/src/components/admin/OrderListScreen.js

import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Protected Admin Endpoint
        const { data } = await API.get('/orders'); 
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Access denied or server error.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- LOADER IMPLEMENTATION FIX ---
  if (loading) return (
    <div className='loader-container'>
        <div className='loader'></div>
    </div>
  );
  // --- END LOADER FIX ---
  
  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;

  return (
    <div className='order-list admin-content-inner'>
      <h2>All Orders</h2>
      
      {orders.length === 0 ? (
          <p>No orders found in the system.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              {/* <th>DELIVERED</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* Display unique ID (full ID or the shortened version if preferred) */}
                <td>{`${order._id.substring(0, 8)}...${order._id.substring(21)}`}</td>
                <td>{order.user ? order.user.name : 'Deleted User'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;