const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    username: { //the name of the staff member

        type: String,
        required: true,

    },
    password: { //the password of the staff member

        type: String,
        required: true,

    },

    role: { //the role of the staff member 
        //if the staff member is a manager then the role is 0
        //otherwise the role is 1 (cashier)
        type: Number,
        required: true,
    },






});

module.exports = mongoose.model('Staff', staffSchema)