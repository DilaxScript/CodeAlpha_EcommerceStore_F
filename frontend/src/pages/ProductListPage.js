// frontend/src/pages/ProductListPage.js

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard'; 
import { useLocation } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Extract keyword and category from URL query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  
  // Determine title based on filter
  const pageTitle = keyword 
      ? `Search Results for "${keyword}"` 
      : category 
      ? `${category} Products`
      : 'All Products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // CRITICAL: Send both filters to the backend API
        const { data } = await API.get(`/products?keyword=${keyword}&category=${category}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    // Re-run fetch whenever keyword or category changes
    fetchProducts();
  }, [keyword, category]); // FIX: Added primitive dependencies to satisfy React Hook rules

  if (loading) return (<div className='loader-container'><div className='loader'></div></div>);
  if (error) return <h2 style={{ color: 'red', padding: '20px' }}>{error}</h2>;

  return (
    <>
      <h1>{pageTitle}</h1>
      
      {products.length === 0 ? (
        <p>No products found matching your criteria. Try a different search term.</p>
      ) : (
        <div className='product-list'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} /> 
          ))}
        </div>
      )}
    </>
  );
};

export default ProductListPage;