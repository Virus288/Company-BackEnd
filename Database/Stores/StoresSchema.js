const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    Street : {
        type: String,
        required: [true]
    },
    BuildingNumber : {
        type: Number,
        required: [true]
    },
    City : {
        type: String,
        required: [true]
    },
    Employees : Object,
    Stock : Object
}, { collection: 'Store' });

module.exports = storeSchema;
