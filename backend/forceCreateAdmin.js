// backend/forceCreateAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function forceCreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@codealpha.com' });
    
    // Create new admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@codealpha.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

forceCreateAdmin();