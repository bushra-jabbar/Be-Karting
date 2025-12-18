const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  image: String, // Filename in /images/ folder
  description: String,
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);