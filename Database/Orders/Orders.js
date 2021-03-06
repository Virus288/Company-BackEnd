const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    Amount : {
        type: Number,
        required: [true]
    },
    Code : {
        type: Number,
        required: [true]
    },
    Date : {
        type: Object,
        required: [true]
    },
    Done : {
        type: Boolean,
        required: [true],
        default: false
    },
    Store: {
        type: Number,
        required: [true]
    },
    AddedBy: {
        type: String,
        required: [true]
    }
}, { collection: 'Order' });

module.exports = ordersSchema ;
