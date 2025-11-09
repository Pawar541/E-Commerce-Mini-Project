const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// GET /api/products  - public, paginated
router.get('/', asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const search = req.query.search ? { $or: [{ name: new RegExp(req.query.search, 'i') }, { slug: new RegExp(req.query.search, 'i') }] } : {};
  const filter = { deleted: false, ...search };
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).skip((page-1)*limit).limit(limit).sort({ createdAt: -1 });
  res.json({ page, limit, total, products });
}));

// GET /api/products/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.deleted) { res.status(404); throw new Error('Product not found'); }
  res.json(product);
}));

module.exports = router;
