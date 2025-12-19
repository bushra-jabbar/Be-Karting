const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);