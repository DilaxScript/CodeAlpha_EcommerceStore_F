// frontend/src/pages/ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { getFullImageUrl } from '../services/api'; 
import { useCart } from '../context/CartContext'; 

const ProductPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { dispatch } = useCart(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for quantity selection (starts at 1)
  const [qty, setQty] = useState(1); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found or failed to fetch details.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (!product) return;
    
    // The stock availability check is implicitly handled by the <select> dropdown, 
    // as it only shows options up to product.countInStock.

    // Dispatch the ADD_ITEM action
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: product._id,
        name: product.name,
        // Use the first element of the 'images' array for the cart image
        image: product.images[0], 
        price: product.price,
        countInStock: product.countInStock,
        // CRITICAL: Pass the user-selected quantity
        qty: Number(qty), 
      },
    });
    
    navigate('/cart'); 
  };

  // --- LOADER IMPLEMENTATION FIX ---
  if (loading) return (
    <div className='loader-container'>
        <div className='loader'></div>
    </div>
  );
  // --- END LOADER FIX ---
  
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>;

  return (
    <div className='product-detail'>
      
      {/* Image display fix */}
      <img src={getFullImageUrl(product.images[0])} alt={product.name} /> 
      
      <div>
        <h1>{product.name}</h1>
        <p>Price: **${product.price}**</p>
        <p>Description: {product.description}</p>
        
        {/* Display stock status */}
        <p>
            Status: 
            <strong>
                {product.countInStock > 0 ? ' In Stock' : ' Out of Stock'}
            </strong>
        </p>

        {product.countInStock > 0 && (
          <div className='quantity-selector'>
            <label>Qty:</label>
            {/* QTY Select Box: Options run from 1 up to the current stock count */}
            <select 
                value={qty} 
                onChange={(e) => setQty(e.target.value)}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button 
                onClick={addToCartHandler} 
                className='btn-success'
                // Button is implicitly enabled only if countInStock > 0
            >
                Add To Cart
            </button>
          </div>
        )}
        
        {/* Explicitly show error if stock is zero */}
        {product.countInStock === 0 && (
            <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                Stock is currently empty.
            </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;