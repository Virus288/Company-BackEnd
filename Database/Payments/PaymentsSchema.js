const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Amount : {
        type: Number,
        required: [true, 'Please enter amount of product']
    },
    Done : {
        type: Boolean,
        required: [true],
        default: false
    },
    Date : {
        type: Object,
        required: [true]
    },
    Store : {
        type: Number,
        required: [true]
    },
    AddedBy: {
        type: String,
        required: [true]
    },
    group: {
        type: String,
        required: true
    }
}, { collection: 'Payment' });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;
