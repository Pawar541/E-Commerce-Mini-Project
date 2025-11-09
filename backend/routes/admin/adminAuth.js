const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/admin/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  if (!admin) { res.status(401); throw new Error('Invalid credentials'); }
  if (admin.role !== 'admin') { res.status(403); throw new Error('Forbidden'); }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) { res.status(401); throw new Error('Invalid credentials'); }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
}));

// GET /api/admin/profile
const auth = require('../../middleware/auth');
router.get('/profile', auth, asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  res.json(req.user);
}));

module.exports = router;
