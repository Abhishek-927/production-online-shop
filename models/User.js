const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'buyer'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('User', UserSchema);