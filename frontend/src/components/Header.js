// frontend/src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
// NOTE: Assuming SearchBox is not needed in the final version of the header
// import SearchBox from './SearchBox'; 

const Header = () => {
    const { user } = useAuth();
    const activeUser = user; 
    
    // Check role based on the user object from context
    const isAdminUser = activeUser && activeUser.role === 'admin'; 
    
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const logoutHandler = () => { logout(); };

    return (
        <header>
            <nav className='navbar'> 
                <Link to='/' className='nav-brand'>CodeAlpha Store</Link>
                
                <div className='nav-links-container'>
                    
                    {/* 🔑 ADMIN DASHBOARD BUTTON (Only visible AFTER Admin login) */}
                    {isAdminUser && ( 
                        <Link to='/admin/dashboard' className='nav-link admin-link'>Admin Dashboard</Link>
                    )}

                    {/* 🛒 CART LINK */}
                    <Link to='/cart' className='nav-link cart-link'>
                        🛒 Cart ({cartCount})
                    </Link>

                    {/* 🔒 AUTHENTICATION LINKS */}
                    {activeUser ? ( 
                        // If Logged In 
                        <>
                            {/* Orders Link */}
                            <Link to='/orders' className='nav-link' style={{ marginRight: '15px' }}>Orders</Link> 
                            
                            {/* User Greeting */}
                            <span className='user-greeting'>Hello, {activeUser.name.split(' ')[0]}</span>
                            
                            <button onClick={logoutHandler} className='nav-button'>Logout</button>
                        </>
                    ) : (
                        // If Logged Out 
                        <>
                            {/* FIX: Removed the redundant Admin Login Link */}
                            
                            {/* STANDARD CUSTOMER LOGIN */}
                            <Link to='/login' className='nav-link'>Sign In</Link>
                            
                            {/* REGISTRATION */}
                            <Link to='/register' className='nav-link'>Register</Link> 
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;