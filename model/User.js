const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
        min: 6

    },
    fullName: {
        type: String,
        required: true,
        min: 6

    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10

    },
    nic: {
        type: String,
        required: true,
        min: 10,
        max: 12

    },

    password: {
        type: String,
        required: true,
        min: 6
    },

});

module.exports = mongoose.model('User', userSchema)