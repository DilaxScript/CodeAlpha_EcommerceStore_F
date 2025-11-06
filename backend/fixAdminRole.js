// backend/fixAdminRole.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function fixAdminRole() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Update the admin user role
    const result = await User.findOneAndUpdate(
      { email: 'admin@codealpha.com' },
      { $set: { role: 'admin' } },
      { new: true }
    );
    
    if (result) {
      console.log('✅ Admin role updated successfully!');
      console.log('Name:', result.name);
      console.log('Email:', result.email);
      console.log('Role:', result.role);
    } else {
      console.log('❌ Admin user not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixAdminRole();