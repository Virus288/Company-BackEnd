const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Name : {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    Store: {
        type: String,
        required: true
    },
}, { collection: 'Employee' });

module.exports = employeeSchema;
