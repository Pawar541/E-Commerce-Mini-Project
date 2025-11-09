const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  weight: { type: Number },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
