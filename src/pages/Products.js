// frontend/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    alert(`${product.name} added to cart!`);
    // Later cart functionality add pannuvom
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Our Products</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {products.map(product => (
          <div key={product._id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '5px', 
            padding: '1rem',
            textAlign: 'center'
          }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover',
                borderRadius: '5px'
              }}
            />
            <h3 style={{ margin: '1rem 0' }}>{product.name}</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
              ${product.price}
            </p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {product.description}
            </p>
            <button 
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;