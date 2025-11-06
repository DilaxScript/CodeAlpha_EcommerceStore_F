// backend/updateAdminRole.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function updateAdminRole() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Find the admin user
    const adminUser = await User.findOne({ email: 'admin@codealpha.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('📋 Before Update:');
    console.log('- Name:', adminUser.name);
    console.log('- Email:', adminUser.email);
    console.log('- Role:', adminUser.role);
    
    // Update the role to admin
    adminUser.role = 'admin';
    await adminUser.save();
    
    console.log('\n✅ After Update:');
    console.log('- Role updated to:', adminUser.role);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin role:', error);
    process.exit(1);
  }
}

updateAdminRole();