const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { adminOnly } = require('../middleware/auth');

// Simple admin login page (to set session email)
router.get('/login', (req, res) => {
  res.render('admin/login', { layout: 'layouts/admin' });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  if (email === 'admin@shop.com') {
    req.session.email = email;
    return res.redirect('/admin/products');
  }
  res.status(403).send('Invalid admin credentials');
});

router.get('/logout', (req, res) => {
  req.session.email = null;
  res.redirect('/admin/login');
});

// PRODUCTS ----------------------------

// View products
router.get('/products', adminOnly, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const count = await Product.countDocuments();

  res.render('admin/products', {
    products,
    current: page,
    pages: Math.ceil(count / limit),
    layout: 'layouts/admin'
  });
});

// Add product form
router.get('/products/add', adminOnly, (req, res) => {
  res.render('admin/add-product', { layout: 'layouts/admin' });
});

// Save product
router.post('/products/add', adminOnly, async (req, res) => {
  await Product.create(req.body);
  res.redirect('/admin/products');
});

// Edit product
router.get('/products/edit/:id', adminOnly, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', { product, layout: 'layouts/admin' });
});

// Update product
router.post('/products/edit/:id', adminOnly, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/products');
});

// Delete product
router.get('/products/delete/:id', adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});


// ORDERS ----------------------------

// View orders
router.get('/orders', adminOnly, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render('admin/orders', {
    orders,
    layout: 'layouts/admin',
    title: "Manage Orders"
  });
});

// Update order status
router.post('/orders/status/:id', adminOnly, async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.redirect('/admin/orders');
});

module.exports = router;
