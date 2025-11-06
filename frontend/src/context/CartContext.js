// frontend/src/context/CartContext.js
import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Get initial cart state from local storage or set to empty array
const initialCartState = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const item = action.payload;
      const existItem = state.find((x) => x.product === item.product);

      if (existItem) {
        // If item exists, update its quantity
        return state.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        // If item is new, add it to the cart
        return [...state, item];
      }

    case 'REMOVE_ITEM':
      // Filter out the item to be removed
      return state.filter((x) => x.product !== action.payload);

    case 'CLEAR_CART':
      return []; // Empty the cart

    default:
      return state;
  }
};

// Create the Context
export const CartContext = createContext();

// Context Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartState);

  // Effect to update local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart easily
export const useCart = () => {
  return useContext(CartContext);
};