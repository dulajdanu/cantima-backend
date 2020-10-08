const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: { //the name of the food item

        type: String,
        required: true,

    },
    // quantity: { //the quantity of the food item
    //     type: Number,
    //     required: true,
    // },
    price: { //the price of the food item
        type: Number,
        required: true,
    },

    image: { //the image of the food item in base64 format
        type: String,
        required: true,
    },



    id: { //the id of the food item
        type: String,
        required: true,
    },
    category: { //category of the item
        type: Number,
        required: true,
    },




});

module.exports = mongoose.model('Item', itemSchema)