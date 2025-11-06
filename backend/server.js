<<<<<<< HEAD
// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
// CRITICAL: Import 'path' for serving static files
const path = require('path'); 

// --- Configuration and Database ---
dotenv.config(); 
connectDB(); 

const app = express();

// --- 1. Middleware (MUST COME FIRST) ---
app.use(express.json()); // Allows parsing of JSON request body (for text data)
app.use(cors()); // Enable CORS for frontend connection

// --- 2. Route Imports ---
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); 

// --- 3. Route Definitions ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); 

// --- 4. Static File Serving (CRITICAL FIX) ---

// a) Serves files uploaded by Multer (e.g., /uploads/filename.jpg)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// b) CRITICAL FIX: Serve files directly from the frontend's public folder
// This handles static assets like /banner.jpg, /favicon.ico, etc.
app.use(express.static(path.join(__dirname, '../frontend/public')));


// --- 5. Server Listener ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - NOTE: lowercase 'p' in products
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
// backend/server.js - Add this with other routes
app.use('/api/admin', require('./routes/admin'));
// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce API is working!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ca0eb719c40542124a070c7231e1884c68091931
