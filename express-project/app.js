const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 3000;

// 1. Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/kartingDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 2. Middleware & View Engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// EJS Setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout', 'layouts/main'); // Ensure this file exists at views/layouts/main.ejs

// 3. Routes
// Priority Routes (External files)
const productRoutes = require('./routes/productRoutes'); // File import karna
app.use('/', productRoutes);
app.use("/products", require("./routes/productRoutes"));
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
app.use("/", require("./routes/mainRoutes"));


// Admin route example
app.get('/admin', (req, res) => {
    res.render('admin/dashboard', { layout: 'layouts/admin' }); // Different layout for admin
});
// Form se data receive karne ke liye zaroori middleware
app.use(express.urlencoded({ extended: true }));

// Root Route (Make sure this doesn't conflict with mainRoutes)
app.get('/', (req, res) => {
  res.render('pages/home');
});

// 4. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
