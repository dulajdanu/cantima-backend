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
    password: {
        type: String,
        required: true,
        min: 6
    }
});

module.exports = mongoose.model('User', userSchema)