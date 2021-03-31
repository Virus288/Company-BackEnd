const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    Store : {
        type: String,
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
    },
    group: {
        type: String,
        required: true
    }
}, { collection: 'DailySchema' });

const DailySchema = mongoose.model('dailySchema', dailySchema);

module.exports = DailySchema;
