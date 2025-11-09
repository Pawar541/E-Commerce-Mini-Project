require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-mini');
app.use(express.json());

// public routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// admin routes
app.use('/api/admin', require('./routes/admin/adminAuth'));
app.use('/api/admin/products', require('./routes/admin/adminProducts'));
app.use('/api/admin/orders', require('./routes/admin/adminOrders'));

// simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
