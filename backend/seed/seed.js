/**
 * Seed script: creates admin user and sample products.
 * Run: node seed/seed.js (ensure MONGODB_URI in env or .env)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-mini';
(async () => {
  await connectDB(uri);
  // Clear minimal sets (CAUTION in prod)
  console.log('Seeding admin and products...');
  const adminEmail = 'admin@example.com';
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hashed = await bcrypt.hash('Admin@12345', 10);
    await User.create({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
    console.log('Created admin:', adminEmail);
  } else {
    console.log('Admin already exists.');
  }
  const raw = fs.readFileSync(__dirname + '/seed-products.json','utf8');
  const products = JSON.parse(raw);
  for (const p of products) {
    const ex = await Product.findOne({ slug: p.slug });
    if (!ex) await Product.create(p);
  }
  console.log('Products seeded.');
  process.exit(0);
})().catch(err => { console.error(err); process.exit(1); });
