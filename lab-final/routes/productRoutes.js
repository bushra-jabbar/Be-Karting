const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/*
-------------------------------------------------
GET: Show Products Page
-------------------------------------------------
*/
router.get('/', async (req, res) => {
  const products = await Product.find();
  const selectedCategory = req.query.category || '';

  res.render('pages/products', {
    products,
    pages: 0,
    current: 1,
    selectedCategory
  });
});

/*
-------------------------------------------------
POST: Add To Cart (AJAX)
-------------------------------------------------
*/
router.post('/add-to-cart/:id', async (req, res) => {
  console.log("ADD TO CART HIT:", req.params.id);

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(
    item => item.productId.toString() === product._id.toString()
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    req.session.cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  return res.json({
    message: "Added to cart",
    cart: req.session.cart
  });
});

module.exports = router;
