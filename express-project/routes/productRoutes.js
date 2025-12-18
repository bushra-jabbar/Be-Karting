const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Sirf aik hi baar GET '/products' rakhein
router.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6; 
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    if (req.query.minPrice || req.query.maxPrice) {
        query.price = { 
            $gte: req.query.minPrice || 0, 
            $lte: req.query.maxPrice || 9999 
        };
    }

    try {
        const products = await Product.find(query).skip(skip).limit(limit);
        const count = await Product.countDocuments(query);

        res.render('pages/products', {
            products: products,
            current: page,
            pages: Math.ceil(count / limit),
            title: "Shop Gear",
            selectedCategory: req.query.category || "" // Ye filter dropdown ke liye zaroori hai
        });
    } catch (err) {
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;