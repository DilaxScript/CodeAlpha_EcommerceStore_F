// backend/models/productModel.js

const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    // CRITICAL FIX: Add the category field for filtering/menu navigation
    category: { type: String, required: true }, 
    // CHANGE 1: Use an array of strings for multiple images
    images: [{ type: String, required: true }], 
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;