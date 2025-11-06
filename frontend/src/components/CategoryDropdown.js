// frontend/src/components/CategoryDropdown.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox'; 
// NOTE: Assuming your categories are now correctly imported from a file
import categories from '../data/categories'; 

const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCategorySelect = (category) => {
        // Construct the query string
        const query = category === 'All Products' ? '' : `?category=${category}`;
        
        // CRITICAL FIX: Navigate to the dedicated product list page (/products)
        navigate(`/products${query}`); 
        
        // Close the dropdown immediately after selection
        setIsOpen(false); 
    };
    
    // Toggle function that handles opening/closing
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Wrapper for Category Dropdown and Search Bar
        <div className='category-dropdown-container-and-search'> 
            
            <div className='category-dropdown-container'>
                
                {/* 1. CATEGORIES BUTTON */}
                <button 
                    onClick={handleToggle} 
                    className='category-toggle-button'
                    type='button'
                >
                    CATEGORIES ☰
                </button>

                {/* Dropdown Menu (Conditionally rendered) */}
                {isOpen && (
                    <div className='category-dropdown-menu'>
                        {categories.map((cat, index) => (
                            <div 
                                key={index}
                                className='category-dropdown-item'
                                // Calls the handler which performs navigation and closes the menu
                                onClick={() => handleCategorySelect(cat)} 
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 2. SEARCH BOX PLACEMENT */}
            <div className='integrated-search-box'>
                <SearchBox />
            </div>
            
        </div>
    );
};

export default CategoryDropdown;