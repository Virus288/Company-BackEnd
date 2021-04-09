const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, "Minimum password length is 6 characters"]
    },
    role: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    FirstOpen: {
        type: Boolean,
        required: [true],
        default: true
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
