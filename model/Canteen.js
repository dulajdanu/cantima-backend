const mongoose = require('mongoose');
const canteenSchema = new mongoose.Schema({
    name: { //the name of the canteen
        type: String,
        required: true,

    },
    id: { //the id of the canteen
        type: String,
        required: true,
    },
    uni_id: { //the name of the university where the canteen belongs
        type: String,
        required: true,
    },



});

module.exports = mongoose.model('Canteen', canteenSchema)