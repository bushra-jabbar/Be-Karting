const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Aik page par 5 products
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const count = await Product.countDocuments(); // Total products kitne hain

        // Ye variables 'pages' aur 'current' render mein hona lazmi hain
        res.render('admin/products', {
            products: products,
            current: page,
            pages: Math.ceil(count / limit), // Calculation for total pages
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Admin panel load nahi ho saka.");
    }
});

// 2. CREATE: Naya product add karne ka form
router.get('/products/add', (req, res) => {
    res.render('admin/add-product', { layout: 'layouts/admin' });
});

// 3. CREATE: Form data ko database mein save karna
router.post('/products/add', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/admin/products');
});

// 4. DELETE: Product khatam karna
router.get('/products/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
});
// Add Product Page dikhane ke liye
router.get('/products/add', (req, res) => {
    res.render('admin/add-product', { layout: 'layouts/admin' });
});

// Form submit hone par database mein save karne ke liye
router.post('/products/add', async (req, res) => {
    try {
        const { name, price, category, image, description } = req.body;
        
        // Naya product object banana
        const newProduct = new Product({
            name,
            price,
            category,
            image,
            description
        });

        await newProduct.save(); // Database mein save karna
        res.redirect('/admin/products'); // Save ke baad product list par wapas jana
    } catch (err) {
        console.log("Error saving product:", err);
        res.status(500).send("Product can't be saved.");
    }
});
// DELETE Product
router.get('/products/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id); // ID ke zariye product delete karna
        res.redirect('/admin/products');
    } catch (err) {
        res.status(500).send("Delete karne mein masla aaya.");
    }
});

// EDIT Page (Form load karna)
router.get('/products/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/edit-product', { product, layout: 'layouts/admin' });
    } catch (err) {
        res.status(404).send("Product nahi mila.");
    }
});

// UPDATE Logic (Data save karna)
router.post('/products/edit/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/products');
    } catch (err) {
        res.status(500).send("Update nahi ho saka.");
    }
});
module.exports = router;