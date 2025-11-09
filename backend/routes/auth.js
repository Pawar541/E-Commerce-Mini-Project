const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    res.status(400); throw new Error('Missing fields');
  }
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error('User exists'); }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashed });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) { res.status(401); throw new Error('Invalid credentials'); }
  const match = await require('bcryptjs').compare(password, user.password);
  if (!match) { res.status(401); throw new Error('Invalid credentials'); }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}));

module.exports = router;
