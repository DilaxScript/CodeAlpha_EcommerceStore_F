// frontend/src/components/admin/ProductListScreen.js

import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ProductCreateScreen from './ProductCreateScreen'; 
import ConfirmModal from '../ConfirmModal'; 

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('view');
  
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products for management.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = (id) => {
    setProductToDelete(id); 
    setShowModal(true);      
  };

  const confirmDeleteHandler = async () => {
    setShowModal(false); 
    if (!productToDelete) return;

    try {
      await API.delete(`/products/${productToDelete}`); 
      setProductToDelete(null); 
      fetchProducts(); 
    } catch (err) {
      alert('Delete failed. Check server logs.'); 
    }
  };

  // --- LOADER/ERROR RENDERING ---
  if (loading) return (
    <div className='loader-container'><div className='loader'></div></div>
  );
  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;
  
  // --- Conditional Rendering for Create Mode ---
  if (mode === 'create') {
    return (
        <div className='admin-content-inner'>
            <button onClick={() => setMode('view')} className='btn-primary'>← Back to Product List</button>
            <ProductCreateScreen fetchProducts={fetchProducts} /> 
        </div>
    );
  }

  // --- Rendering the Product List (View Mode) ---
  const isProductListEmpty = products.length === 0;

  return (
    <div className='product-management'>
      
      {/* 1. RENDER THE CUSTOM MODAL */}
      <ConfirmModal
        show={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this product? This action cannot be undone."
        onConfirm={confirmDeleteHandler}
        onCancel={() => setShowModal(false)}
      />
      
      {/* 2. HEADER AND ADD BUTTON (Always Visible) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Products List ({products.length})</h2>
        <button onClick={() => setMode('create')} className='btn-success'>+ Add New Product</button> 
      </div>

      {/* 3. CONDITIONAL TABLE RENDERING */}
      {isProductListEmpty ? (
        <p>No products found in the database. Click "+ Add New Product" to get started.</p>
      ) : (
        <table>
          <thead> 
              <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>ACTIONS</th>
              </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                {/* Shortened Unique ID */}
                <td>{`${product._id.substring(0, 8)}...${product._id.slice(-3)}`}</td> 
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button 
                    onClick={() => {/* Implement Edit Form/Modal here */}}
                    className='btn-primary' style={{ marginRight: '5px', padding: '5px 10px' }}
                  >
                    Edit
                  </button>
                  <button 
                      onClick={() => handleDeleteClick(product._id)} 
                      className='btn-danger' style={{ padding: '5px 10px' }}
                  >
                      Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;