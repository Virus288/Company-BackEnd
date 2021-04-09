const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    Store : {
        type: Number,
        required: [true]
    },
    Sold : {
        type: Object,
        required: [true]
    },
    Date : {
        type: Object,
        required: [true]
    },
    Summary: {
        type: Number,
        required: [true]
    }
}, { collection: 'DailySchema' });

module.exports = dailySchema;
