const mongoose = require('mongoose');
const universitySchema = new mongoose.Schema({
    university: {
        type: String,
        required: true,

    },
    id: {
        type: String,
        required: true,
    },



});

module.exports = mongoose.model('University', universitySchema)