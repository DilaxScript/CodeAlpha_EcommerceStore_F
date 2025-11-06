// frontend/src/pages/CartPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// CRITICAL: Import the image utility helper
import { getFullImageUrl } from '../services/api'; 

const CartPage = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const removeItemHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQtyHandler = (id, newQty) => {
    const itemToUpdate = cartItems.find(item => item.product === id);
    if (itemToUpdate) {
        dispatch({ 
            type: 'ADD_ITEM', // Reuses ADD_ITEM to update quantity
            payload: { ...itemToUpdate, qty: Number(newQty) }
        });
    }
  };

  // Calculate total price and total items
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const checkoutHandler = () => {
    navigate('/placeorder'); 
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to='/'>Go Shopping</Link></p>
      ) : (
        <>
          <div className='cart-items-list'>
            {cartItems.map((item) => (
              <div key={item.product} className='cart-item'>
                
                {/* CRITICAL FIX: Use the helper to display the uploaded image */}
                <img src={getFullImageUrl(item.image)} alt={item.name} style={{ width: '50px' }} />
                
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <p>${item.price}</p>
                
                <select
                  value={item.qty}
                  onChange={(e) => updateQtyHandler(item.product, e.target.value)}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                
                {/* Button uses CSS Class */}
                <button 
                    onClick={() => removeItemHandler(item.product)}
                    className='btn-danger' 
                >
                    Remove
                </button>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <h2>Subtotal ({itemsCount}) items</h2>
            <h3>Total Price: **${subtotal}**</h3>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className='btn-success' // Button uses CSS Class
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;