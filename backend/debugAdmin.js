// backend/debugAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function debugAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');
    
    // Check all users
    const allUsers = await User.find();
    console.log('\n📋 All Users in Database:');
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    // Check specific admin user
    const adminUser = await User.findOne({ email: 'admin@codealpha.com' });
    console.log('\n🔍 Admin User Search Result:');
    console.log(adminUser);
    
    if (adminUser) {
      console.log('\n✅ Admin user exists with role:', adminUser.role);
    } else {
      console.log('\n❌ Admin user not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

debugAdmin();