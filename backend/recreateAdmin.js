// backend/recreateAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function recreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    console.log('🗑️ Deleting existing admin user...');
    await User.deleteOne({ email: 'admin@codealpha.com' });
    
    console.log('👑 Creating new admin user...');
    const admin = new User({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ New admin user created successfully!');
    console.log('Email: admin@codealpha.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

recreateAdmin();