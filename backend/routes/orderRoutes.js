// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
// CRITICAL: Ensure Product Model is imported to update stock
const Product = require('../models/productModel'); 
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create new order (User) - INVENTORY FIX APPLIED HERE
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }
    
    // 1. Create the Order object
    const order = new Order({
        user: req.user._id,
        orderItems,
        totalPrice,
        isPaid: true, 
        paidAt: Date.now(), 
    });

    try {
        // 2. Save the Order
        const createdOrder = await order.save();

        // 3. CRITICAL FIX: Decrement Stock for each ordered item
        // Use Promise.all to handle asynchronous database updates concurrently
        const updateStockPromises = orderItems.map(async (item) => {
            const product = await Product.findById(item.product);
            
            if (product) {
                // Subtract the purchased quantity
                product.countInStock -= item.qty; 
                if (product.countInStock < 0) {
                     product.countInStock = 0; // Prevent negative stock
                }
                await product.save();
            }
        });

        // Wait for all inventory updates to complete
        await Promise.all(updateStockPromises);

        // 4. Send Success Response
        res.status(201).json(createdOrder);

    } catch (error) {
        console.error('Error during order creation or stock update:', error);
        res.status(500).json({ message: 'Order processing failed due to server error.' });
    }
});

// @desc    Get logged in user orders (User)
// @route   GET /api/orders/myorders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
    res.json(orders);
});

// --------------------------------------------------------
// --- CRITICAL FIX: Get Order by ID Route (Existing) ---
// --------------------------------------------------------
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        if (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
            res.json(order);
        } else {
            res.status(403).json({ message: 'Not authorized to view this order' });
        }
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});


// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name'); 
    res.json(orders);
});

module.exports = router;