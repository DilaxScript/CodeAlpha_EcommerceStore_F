// backend/createNewAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createNewAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Create brand new admin
    const newAdmin = new User({
      name: 'Super Admin',
      email: 'superadmin@codealpha.com',
      password: 'admin123',
      role: 'admin'
    });

    await newAdmin.save();
    console.log('✅ New super admin created!');
    console.log('Email: superadmin@codealpha.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createNewAdmin();