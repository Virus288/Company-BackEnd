const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    Name : {
        type: String,
        required: [true]
    },
    City : {
        type: String,
        required: [true]
    },
    Street : {
        type: String,
        required: [true]
    },
    Number : {
        type: Number,
        required: [true]
    },
    Postcode : {
        type: String,
        required: [true]
    }
}, { collection: 'Company' });

module.exports = CompanySchema;
