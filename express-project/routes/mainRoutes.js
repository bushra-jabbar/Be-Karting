const express = require("express");
const router = express.Router();

// 1. Home Route
router.get("/", (req, res) => {
  res.render("pages/index", { title: "Home" });
});

// 2. Contact Route
router.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact" });
});

// 3. Checkout Route (MOVED ABOVE EXPORTS)
router.get("/checkout", (req, res) => {
  res.render("pages/checkout", { title: "Checkout" });
});

// ALWAYS KEEP THIS AT THE VERY BOTTOM
module.exports = router;