const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Amount : {
        type: Number,
        required: [true, 'Please enter amount of product']
    },
    Category : {
        type: String,
        required: [true]
    },
    IsAvailable : {
        type: Boolean,
        required: [true]
    }
}, { collection: 'Stock' });

module.exports = stockSchema;
