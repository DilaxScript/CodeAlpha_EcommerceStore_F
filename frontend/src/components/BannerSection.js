// frontend/src/components/BannerSection.js

import React from 'react';

const BannerSection = () => {
    return (
        <div className="hero-section">
            <img src="/image/banner-bg.png" alt="Get Started with Shopping" className="hero-image" />
            <div className="hero-content">
                <h1>GET STARTED YOUR FAVORITE SHOPPING</h1>
                <p>Explore our latest collections and find your style.</p>
                
                {/* CRITICAL FIX: Use an <a> tag for unique styling */}
                <a 
                    href="#products" // Set a hash link for semantic HTML
                    onClick={(e) => { 
                        e.preventDefault(); // Prevents instant jump to #products
                        window.scrollTo({ 
                            top: 700, 
                            behavior: 'smooth' 
                        });
                    }} 
                    className="cta-link-style" /* <-- NEW CLASS FOR UNIQUE DESIGN */
                >
                    SCROLL DOWN TO SHOP &rarr; 
                </a>
            </div>
        </div>
    );
};
export default BannerSection;