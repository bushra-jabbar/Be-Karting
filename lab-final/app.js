const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session'); // Top par import karein

const app = express();
const PORT = 3000;

// 1. Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/kartingDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 2. View Engine Setup (Routes se pehle hona chahiye)
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout', 'layouts/main');

// 3. Middlewares
app.use(express.urlencoded({ extended: true })); // Form data handle karne ke liye
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session Configuration (Task 2 & 5 ke liye zaroori)
app.use(session({
  secret: 'be-karting-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Global Middleware to make session available in EJS (Optional but helpful)
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// 4. Routes Connection
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require("./routes/mainRoutes");

// Mount Routes
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);
app.use("/", mainRoutes); // Isko aakhir mein rakhein taake specific routes pehle match hon

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});