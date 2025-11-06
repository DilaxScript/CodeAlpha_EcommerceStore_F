// backend/checkAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    const adminUser = await User.findOne({ email: 'admin@codealpha.com' });
    
    console.log('🔍 ADMIN USER DETAILS:');
    console.log('Name:', adminUser?.name);
    console.log('Email:', adminUser?.email);
    console.log('Role:', adminUser?.role);
    console.log('Has role field:', adminUser?.role !== undefined);
    
    if (!adminUser) {
      console.log('❌ Admin user not found!');
    } else if (!adminUser.role || adminUser.role !== 'admin') {
      console.log('❌ Admin user exists but role is not "admin"');
      console.log('Current role:', adminUser.role);
    } else {
      console.log('✅ Admin user has correct role!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAdmin();