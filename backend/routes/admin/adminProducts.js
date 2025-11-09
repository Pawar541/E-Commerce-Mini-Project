const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../../models/Product');
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const csv = require('csv-parse/lib/sync');

// GET /api/admin/products - list with pagination & search
router.get('/', auth, isAdmin, asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const search = req.query.search ? { $or: [{ name: new RegExp(req.query.search,'i') }, { slug: new RegExp(req.query.search,'i') }] } : {};
  const filter = { ...search };
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).skip((page-1)*limit).limit(limit).sort({ createdAt: -1 });
  res.json({ page, limit, total, products });
}));

// POST /api/admin/products - create product
router.post('/', auth, isAdmin, asyncHandler(async (req, res) => {
  const { name, slug, category, weight, price, stock, images, description } = req.body;
  if (!name || !slug || price == null) { res.status(400); throw new Error('Missing required fields'); }
  const existing = await Product.findOne({ slug });
  if (existing) { res.status(400); throw new Error('Slug must be unique'); }
  const product = await Product.create({ name, slug, category, weight, price, stock, images, description });
  res.status(201).json(product);
}));

// GET /api/admin/products/:id
router.get('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Not found'); }
  res.json(product);
}));

// PUT /api/admin/products/:id
router.put('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Not found'); }
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
}));

// DELETE /api/admin/products/:id (soft delete)
router.delete('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Not found'); }
  product.deleted = true;
  await product.save();
  res.json({ success: true });
}));

// POST /api/admin/products/import (CSV/JSON)
router.post('/import', auth, isAdmin, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error('No file uploaded'); }
  const data = fs.readFileSync(req.file.path, 'utf8');
  let items = [];
  if (req.file.mimetype === 'application/json' || req.file.originalname.endsWith('.json')) {
    items = JSON.parse(data);
  } else {
    // CSV parse (expect columns name,slug,category,weight,price,stock,images,description)
    const records = csv(data, { columns: true, skip_empty_lines: true });
    items = records.map(r => ({
      name: r.name, slug: r.slug, category: r.category, weight: Number(r.weight||0),
      price: Number(r.price||0), stock: Number(r.stock||0), images: r.images ? r.images.split('|') : [], description: r.description
    }));
  }
  const created = await Product.insertMany(items);
  // cleanup uploaded file
  fs.unlinkSync(req.file.path);
  res.json({ created: created.length });
}));

module.exports = router;
