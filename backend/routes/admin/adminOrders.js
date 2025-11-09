const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../../models/Order');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const { createObjectCsvWriter } = require('csv-writer');

// GET /api/admin/orders - list orders with filters & pagination
router.get('/', auth, isAdmin, asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    const q = req.query.search;
    // naive search across id and shipping address or email (populate not done here).
    filter.$or = [
      { 'shippingAddress.fullName': new RegExp(q, 'i') }
    ];
  }
  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter).skip((page-1)*limit).limit(limit).sort({ createdAt: -1 }).populate('user','email name');
  res.json({ page, limit, total, orders });
}));

// GET /api/admin/orders/:id
router.get('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','email name').populate('items.product');
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
}));

// PUT /api/admin/orders/:id/status
router.put('/:id/status', auth, isAdmin, asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  order.status = status;
  await order.save();
  res.json(order);
}));

// PUT /api/admin/orders/:id/notes
router.put('/:id/notes', auth, isAdmin, asyncHandler(async (req, res) => {
  const { notes } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  order.adminNotes = notes;
  await order.save();
  res.json(order);
}));

// POST /api/admin/orders/export  => expects body { ids: [...] } returns CSV file
router.post('/export', auth, isAdmin, asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) return res.status(400).json({ message: 'No ids' });
  const orders = await Order.find({ _id: { $in: ids } }).populate('user','email name');
  const csvWriter = createObjectCsvWriter({
    path: 'exports/orders_export.csv',
    header: [
      {id:'_id', title:'OrderID'},
      {id:'createdAt', title:'CreatedAt'},
      {id:'user', title:'UserEmail'},
      {id:'totalPrice', title:'Total'},
      {id:'status', title:'Status'}
    ]
  });
  const data = orders.map(o => ({ _id: o._id.toString(), createdAt: o.createdAt.toISOString(), user: o.user.email, totalPrice: o.totalPrice, status: o.status }));
  await csvWriter.writeRecords(data);
  res.download('exports/orders_export.csv');
}));

module.exports = router;
