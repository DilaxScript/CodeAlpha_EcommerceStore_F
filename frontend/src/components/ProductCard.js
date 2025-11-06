// frontend/src/components/ProductCard.js
// Final, corrected code for a simple, static product card.

import React from 'react';
// 🔗 Link-ஐப் பயன்படுத்த மறக்க வேண்டாம்
import { Link } from 'react-router-dom'; 
import { getFullImageUrl } from '../services/api'; 

const ProductCard = ({ product, onAddToCart }) => { // onAddToCart prop-ஐச் சேர்க்கிறோம்
  
  // product object கிடைக்கவில்லை என்றால், எதையும் render செய்யாமல் இருக்கலாம்
  if (!product || !product._id || !product.name) {
    return null;
  }

  // 1. 🖼️ பட URL-ஐச் சரிசெய்தல் (array அல்லது string-ஐக் கையாள)
  const imageKey = (product.images && product.images.length > 0) 
                     ? product.images[0] 
                     : product.image; // product.image கீயையும் பரிசோதித்தல்
  
  const imageUrl = imageKey ? getFullImageUrl(imageKey) : '/images/placeholder.jpg'; 
  const productLink = `/product/${product._id}`;

  return (
    <div className='product-card'>
      
      {/* 🔗 கிளிக் செய்து Product Details Page-க்குச் செல்ல */}
      <Link to={productLink}>
        <img 
          src={imageUrl} // 🌟 உறுதி செய்யப்பட்ட URL-ஐப் பயன்படுத்துதல்
          alt={product.name} 
          // 🛑 FIX: பட அளவைச் சீராக்க object-cover மற்றும் நிலையான height
          style={{ width: '100%', objectFit: 'cover', height: '200px' }} 
        /> 
      </Link>
      
      <div className='card-body p-3'>
        {/* Product Name (Navigation Link) */}
        <Link to={productLink}>
          <h4 className="text-lg font-semibold truncate">{product.name}</h4>
        </Link>
        
        {/* Price Display */}
        {/* 🛑 FIX: விலை ஃபார்மட்டைச் சரிபார்த்தல் */}
        <h3 className="text-xl font-bold text-red-600 mt-1">
          ${product.price ? product.price.toFixed(2) : 'N/A'}
        </h3>
        
        {/* 🛒 Add to Cart Button (optional) */}
        {onAddToCart && (
            <button 
                onClick={() => onAddToCart(product._id)}
                className="w-full bg-blue-500 text-white p-2 mt-2 rounded-lg hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;