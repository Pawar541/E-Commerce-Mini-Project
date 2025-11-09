const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: Number,
    price: Number
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  totalPrice: Number,
  status: { type: String, enum: ['Pending','Processing','Shipped','Delivered','Cancelled'], default: 'Pending' },
  adminNotes: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
