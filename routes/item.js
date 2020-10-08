const router = require('express').Router();
const Item = require('../model/Item');
const { itemValidation } = require("../ItemValidation");
const { route } = require('./auth');
const { json } = require('body-parser');

//add new item
router.post('/add', async (req, res) => {


    //LETS VALIDATE DATA BEFORE WE add a new item
    console.log("add new item route");
    const error = itemValidation(req.body)

    if (error.error != null) {
        return res.status(400).send(error.error.details[0].message);
    }


    //check the item is already in the datbase
    const itemExist = await Item.findOne({
        'id': req.body.id,
    });

    if (itemExist) {
        return res.status(400).json({ "message": "Item already exist" });
    }
    console.log("item doesnt exist in the db");


    //create a new Item
    const item = new Item({
        name: req.body.name,
        id: req.body.id,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
    })

    try {
        const savedItem = await item.save();
        res.status(200).json({
            "item": item.id,
            "message": "New item added successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);

    }
});


//get 1 item
router.get('/:itemID', async (req, res) => {
    try {
        const item = await Item.findOne({
            'id': req.params.itemID,
        });
        if (item) {

            return res.json({ "item": item }).status(200);

        }
        else {
            return res.json({
                "message": "Item not found"
            }).status(400);
        }
    } catch (error) {

        return res.json({
            message: error
        }).status(400);

    }
});



module.exports = router;
