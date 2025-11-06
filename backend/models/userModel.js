// backend/models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Role: 'user' for standard customers, 'admin' for management
    role: { type: String, required: true, default: 'user' }, 
  },
  { timestamps: true }
);

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  // 1. If password field hasn't been modified (e.g., updating email), skip hashing.
  if (!this.isModified('password')) {
    return next(); // <--- FIX/IMPROVEMENT: Ensure next() is returned to stop execution
  }
  
  // 2. Hash the password
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // <--- CRITICAL: Call next() after successful hashing
  } catch (error) {
    // If hashing fails, pass the error to the next middleware/save operation
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;