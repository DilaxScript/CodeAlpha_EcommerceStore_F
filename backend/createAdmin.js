// backend/createAdmin.js
<<<<<<< HEAD

const mongoose = require('mongoose');
const User = require('./models/userModel'); 
require('dotenv').config({ path: './.env' }); 

async function createAdmin() {
  const MONGODB_URI = process.env.MONGO_URI; 

  // --- NEW, UNIQUE CREDENTIALS ---
  const ADMIN_EMAIL = 'admin@store.com'; // Use a unique email for this final test
  const ADMIN_PASSWORD = '12345678';          
  // --------------------------------

  if (!MONGODB_URI) {
      console.error("Error: MONGO_URI is not defined in the .env file.");
      process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // 1. Check if the NEW admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('✅ Target Admin user already exists. Exiting.');
      console.log(`Email: ${ADMIN_EMAIL}, Role: ${existingAdmin.role}`);
      await mongoose.connection.close();
      process.exit(0);
    }
    
    // 2. Optional: Clean up older test admins (e.g., admin@codealpha.com)
    // You can skip this step if you already deleted the old user manually.
    // await User.deleteMany({ role: { $ne: 'admin' } }); 

    // 3. Create the new, clean admin user
    const admin = new User({
      name: 'Final Store Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, 
      role: 'admin' 
    });

    await admin.save();
    console.log('🎉 Final Admin user created successfully!');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD} (Use this to log in!)`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
=======
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@codealpha.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: 'admin123', // Will be hashed automatically
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@codealpha.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
>>>>>>> ca0eb719c40542124a070c7231e1884c68091931
    process.exit(1);
  }
}

createAdmin();