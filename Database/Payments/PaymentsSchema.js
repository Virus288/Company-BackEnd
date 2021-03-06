const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: [true, 'Please enter amount of product']
    },
    Done : {
        type: Boolean,
        required: [true],
        default: false
    },
    Date : {
        type: Timestamp,
        required: [true],
        default: false
    },
}, { collection: 'Payment' });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;
