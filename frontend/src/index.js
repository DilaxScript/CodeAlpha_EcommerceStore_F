<<<<<<< HEAD
// frontend/src/index.js

=======
>>>>>>> ca0eb719c40542124a070c7231e1884c68091931
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD

// Import existing Cart Provider
import { CartProvider } from './context/CartContext'; 
// CRITICAL FIX: Import the new Auth Provider
import { AuthProvider } from './context/AuthContext'; 
<meta name="viewport" content="width=device-width, initial-scale=1" />


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the App with both providers. Order often matters, Auth first is standard. */}
    <AuthProvider>
      <CartProvider> 
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
=======
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> ca0eb719c40542124a070c7231e1884c68091931
