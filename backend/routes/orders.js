const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// POST /api/orders - create order (authenticated)
router.post('/', auth, asyncHandler(async (req, res) => {
  const { items, shippingAddress, totalPrice } = req.body;
  if (!items || items.length === 0) { res.status(400); throw new Error('No items'); }
  const order = await Order.create({ user: req.user._id, items, shippingAddress, totalPrice });
  res.status(201).json(order);
}));

// GET /api/orders/my - list orders for user
router.get('/my', auth, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
}));

module.exports = router;
