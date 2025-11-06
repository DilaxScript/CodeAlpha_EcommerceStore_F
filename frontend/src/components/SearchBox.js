// frontend/src/components/SearchBox.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        
        const trimmedKeyword = keyword.trim();

        if (trimmedKeyword) {
            // Correctly navigates to the list page with the search filter
            navigate(`/products?keyword=${trimmedKeyword}`);
        } else {
            // If empty, navigates to the base list page (showing all products)
            navigate('/products');
        }
        
        // CRITICAL FIX: Reset the input field state after submission
        setKeyword('');
    };

    return (
        // CRITICAL FIX: Add a unique wrapper class for CSS isolation
        <div className="search-bar-wrapper">
            <form onSubmit={submitHandler} className="search-form">
                <input
                    type='text'
                    name='keyword' // Changed name to 'keyword' for clarity
                    id='search-input-field' // Added ID for specific CSS targeting
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search Products...'
                />
                <button type='submit' className='search-button'>
                    🔍 
                </button>
            </form>
        </div>
    );
};

export default SearchBox;