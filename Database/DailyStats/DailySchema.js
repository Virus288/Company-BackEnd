const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
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
    Employees : [Object],
    Stock : [Object],
}, { collection: 'DailySchema' });

const DailySchema = mongoose.model('dailySchema', dailySchema);

module.exports = DailySchema;
