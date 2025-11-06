const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics"
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with health monitoring",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics"
  },
  {
    name: "Laptop Backpack",
    price: 49.99,
    description: "Durable laptop backpack with multiple compartments",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Accessories"
  }
];

async function addProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    
    console.log('Sample products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
}

addProducts();
