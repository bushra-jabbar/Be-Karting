const express = require("express");
const router = express.Router();
const Order = require('../models/Order');
const { checkCartNotEmpty } = require('../middleware/auth');

// Home
router.get("/", (req, res) => {
  res.render("pages/index", { title: "Home" });
});

// Contact
router.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact" });
});

// Checkout (Protected)
router.get("/checkout", checkCartNotEmpty, (req, res) => {
  res.render("pages/checkout", { title: "Checkout" });
});

// Place Order
router.post("/place-order", checkCartNotEmpty, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const cart = req.session.cart;

    // Server-side validation
    if (!fullName || !email) {
      return res.status(400).send("All required fields must be filled.");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format.");
    }

    // Recalculate total (Task 4)
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      customerName: fullName,
      email,
      cartItems: cart,
      totalAmount,
      status: "Pending"
    });

    await newOrder.save();

    // Clear cart
    req.session.cart = [];

    // Redirect to confirmation page (shows Order ID)
    res.redirect(`/order/confirmation/${newOrder._id}`);

  } catch (err) {
    console.error(err);
    res.status(500).send("Order placement failed.");
  }
});

module.exports = router;

// Confirmation page (show after redirect)
router.get('/order/confirmation/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');

    res.render('pages/confirmation', { orderId: order._id, title: 'Order Confirmed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not load confirmation');
  }
});
