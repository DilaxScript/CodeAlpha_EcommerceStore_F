// backend/server-json.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JSONDatabase = require('./utils/jsonDB');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize databases
const usersDB = new JSONDatabase('users.json');
const productsDB = new JSONDatabase('products.json');
const ordersDB = new JSONDatabase('orders.json');

// Initialize default admin user
async function initializeAdmin() {
  const users = await usersDB.read();
  const adminExists = users.find(user => user.email === 'admin@codealpha.com');
  
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await usersDB.create({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created');
  }
}

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await usersDB.read();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret');
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await usersDB.read();
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await usersDB.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = jwt.sign({ userId: user.id }, 'secret');
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await productsDB.read();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await productsDB.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Routes
app.post('/api/admin/products', async (req, res) => {
  try {
    const product = await productsDB.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    await productsDB.delete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ecommerce API with JSON Database is working!',
    database: 'JSON Files',
    admin: 'admin@codealpha.com / admin123'
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, async () => {
  await initializeAdmin();
  console.log(`🚀 JSON Database Server running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log(`👑 Admin: admin@codealpha.com / admin123`);
  console.log(`💾 Database: JSON files in backend/data/`);
});