// frontend/src/components/CategoryMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../data/categories'; // Import local categories

const CategoryMenu = () => {
  return (
    <div className='category-menu-bar'>
      <div className='category-menu-content'>
        {categories.map((cat, index) => (
          <Link
            key={index}
            // Use the category name as a filter query parameter
            to={`/?category=${cat === 'All Products' ? '' : cat}`}
            className='category-link'
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;