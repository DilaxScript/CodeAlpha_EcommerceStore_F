// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadMultiple } = require('../middleware/uploadMiddleware'); 

// --- 1. Public Routes (GET) ---

// @desc    Fetch all products (Public) - ROBUST SEARCH & CATEGORY FILTERING
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    const { keyword, category } = req.query;

    let filter = {}; // Initialize filter object

    // 1. Keyword Filtering
    if (keyword && keyword.trim() !== '') {
        filter.name = {
            $regex: keyword.trim(), // Use trimmed keyword
            $options: 'i',   // Case-insensitive
        };
    }

    // 2. Category Filtering (Used by the "SEE ALL" button)
    if (category) {
        // Ensure category matches exactly for filtering
        filter.category = category;
    }

    // 3. Execute the combined filter query
    const products = await Product.find(filter);
    res.json(products);
});

// @desc    Fetch single product by ID (Public)
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// --- 2. Admin Routes (Protected CRUD) ---

// @desc    Create a product (Admin) - HANDLES MULTIPLE FILE UPLOAD
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, uploadMultiple, async (req, res) => { 
    // After uploadMultiple runs, file info is in req.files
    const imageUrls = req.files.map(file => `/${file.path}`);
    const { name, price, description, countInStock, category } = req.body; 

    const product = new Product({
        name,
        price,
        description,
        category, // Ensure category is saved
        images: imageUrls, 
        countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const { name, price, description, countInStock, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.countInStock = countInStock || product.countInStock;
        product.category = category || product.category; // Ensure category is updatable

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;