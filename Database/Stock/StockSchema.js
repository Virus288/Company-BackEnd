const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: [true, 'Please enter amount of product']
    },
    Code : {
        type: Number,
        required: [true]
    },
}, { collection: 'Stock' });

const Stock = mongoose.model('stock', stockSchema);

module.exports = Stock;
