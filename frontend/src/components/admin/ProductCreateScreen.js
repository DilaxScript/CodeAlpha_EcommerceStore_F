// frontend/src/components/admin/ProductCreateScreen.js

import React, { useState } from 'react';
import API from '../../services/api';
// CRITICAL FIX: Corrected import path assumes 'data' folder is now inside 'src/'
import categories from '../../data/categories'; 

// Filter out 'All Products' since it's not a valid product category
const productCategories = categories.filter(cat => cat !== 'All Products');
const DEFAULT_CATEGORY = productCategories[0] || 'Electronics'; 

const ProductCreateScreen = ({ fetchProducts }) => {
  // --- STATE FOR TEXT/NUMBER FIELDS ---
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  
  // NEW STATE: For the selected category
  const [category, setCategory] = useState(DEFAULT_CATEGORY); 
  
  // --- STATE FOR FILE UPLOAD / MESSAGING ---
  const [images, setImages] = useState([]); 
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle file selection
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (images.length === 0) {
        setError('Please select at least one image.');
        return;
    }

    try {
      // 1. Create FormData object
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('countInStock', countInStock);
      
      // CRITICAL FIX: Append the selected category
      formData.append('category', category); 

      // 2. Append image files
      images.forEach((image) => {
        formData.append('images', image);
      });
      
      // Protected POST request
      await API.post('/products', formData); 

      setMessage('Product created successfully!');
      
      // 3. Clear form state after success
      setName('');
      setPrice(0);
      setDescription('');
      setCountInStock(0);
      setCategory(DEFAULT_CATEGORY); // Reset category
      setImages([]);
      
      // Refresh the product list on the dashboard
      if (fetchProducts) {
          fetchProducts();
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product. Check backend console.');
    }
  };

  return (
    <div className='product-form-container'>
      <h2>Add New Product 🛍️</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={submitHandler}>
        {/* Text/Number Fields */}
        <div>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price ($)</label>
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        
        {/* NEW INPUT: Category Selector */}
        <div>
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            style={{ width: '100%', padding: '10px' }}
          >
            {/* Map the filtered categories array into dropdown options */}
            {productCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Stock Count</label>
          <input type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
        </div>
        
        {/* File Upload Field */}
        <div>
            <label>Product Images (Max 10)</label>
            <input 
                type='file' 
                onChange={handleImageChange} 
                multiple 
                required 
                accept='image/*'
            />
            {images.length > 0 && <p style={{fontSize: '0.9em', color: '#666', marginTop: '5px'}}>Selected {images.length} file(s).</p>}
        </div>

        <button type='submit' className='btn-primary'>Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreateScreen;