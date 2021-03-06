const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    amount : {
        type: Number,
        required: [true]
    },
    Code : {
        type: Number,
        required: [true]
    },
    Date : {
        type: Timestamp,
        required: [true],
        default: false
    },
    Done : {
        type: Boolean,
        required: [true],
        default: false
    },
    Store: {
        type: Number,
        required: [true]
    }
}, { collection: 'Order' });

const Order = mongoose.model('order', ordersSchema);

module.exports = Order;
