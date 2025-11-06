// backend/server-memory.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    // Start MongoDB Memory Server
    const mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    
    console.log('🚀 Using In-Memory MongoDB:', mongoUri);
    
    // Connect to in-memory database
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to In-Memory MongoDB');

    // Import models and routes
    const User = require('./models/User');
    const Product = require('./models/Product');
    
    // Create default admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Default admin user created');

    // Add sample products
    const sampleProducts = [
      {
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        description: "High-quality wireless headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics"
      },
      {
        name: "Smart Watch",
        price: 199.99,
        description: "Feature-rich smartwatch",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics"
      }
    ];
    
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products added');

    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/products', require('./routes/products'));
    app.use('/api/orders', require('./routes/orders'));
    app.use('/api/admin', require('./routes/admin'));

    app.get('/', (req, res) => {
      res.json({ 
        message: 'Ecommerce API is working!',
        database: 'In-Memory MongoDB',
        admin: 'admin@codealpha.com / admin123'
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🎉 Server running on port ${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}`);
      console.log(`👑 Admin Login: admin@codealpha.com / admin123`);
    });

  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
}

startServer();