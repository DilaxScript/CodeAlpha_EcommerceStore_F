// frontend/src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard'; 
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  // Products are stored grouped by category
  const [productsByCategory, setProductsByCategory] = useState({}); 
  const [allProducts, setAllProducts] = useState([]); // State for the combined list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { flashMessage } = useAuth(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        
        setAllProducts(data); 

        const groupedProducts = data.reduce((acc, product) => {
            const categoryName = product.category || 'Uncategorized'; 
            
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(product);
            return acc;
        }, {});
        
        setProductsByCategory(groupedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Runs only once on load

  if (loading) return (
    <div className='loader-container'>
        <div className='loader'></div>
    </div>
  );
  
  if (error) return <h2 style={{ color: 'red', padding: '20px' }}>{error}</h2>; 

  const categoryNames = Object.keys(productsByCategory);

  return (
    <> 
      {/* --- WELCOME MESSAGE DISPLAY --- */}
      {flashMessage && (
        <div className='flash-message'> 
          {flashMessage}
        </div>
      )}

      {/* --- START OF CONTENT --- */}
      
      {/* --- 1. ALL PRODUCTS SECTION (Displayed First) --- */}
      {allProducts.length > 0 && (
          <div className="category-section" style={{marginBottom: '50px'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px' }}>
                  <h1 style={{ margin: 0, borderBottom: '2px solid #eee', paddingBottom: '10px'}}>
                      All Products 
                  </h1>
              </div>
              
              {/* CRITICAL FIX: Use 'product-grid' for 4-column layout */}
              <div className='product-grid'> 
                  {allProducts.map((product) => (
                      <ProductCard key={product._id} product={product} /> 
                  ))}
              </div>
          </div>
      )}
      
      {/* --- 2. CATEGORY WISE SECTIONS (Displayed Second) --- */}
      {categoryNames.length > 0 && (
          categoryNames.map(category => (
              <div key={category} className="category-section" style={{marginBottom: '50px'}}>
                  
                  {/* Category Title Header and SEE ALL button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px' }}>
                      <h1 style={{ margin: 0, borderBottom: '2px solid #eee', paddingBottom: '10px'}}>
                          {category}
                      </h1>
                      
                      {/* SEE ALL BUTTON: Link to filtered list page */}
                      <Link 
                          to={`/products?category=${category}`} 
                          className="btn-primary" 
                          style={{ padding: '8px 15px', fontSize: '0.9em' }}
                      >
                          SEE ALL →
                      </Link>
                  </div>
                  
                  {/* CRITICAL FIX: Use 'product-grid' for 4-column layout */}
                  <div className='product-grid'>
                      {productsByCategory[category].map((product) => (
                          <ProductCard key={product._id} product={product} /> 
                      ))}
                  </div>
              </div>
          ))
      )}

      {/* --- END OF CONTENT / Empty State --- */}
      {allProducts.length === 0 && !loading && !error && (
        <p>No products found. Please add products via the Admin Dashboard.</p>
      )}
    </>
  );
};

export default HomePage;