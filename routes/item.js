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
        time: req.body.time,
        veg: req.body.veg,
        des: req.body.des
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

            return res.status(200).json({ "item": item });

        }
        else {
            return res.status(400).json({
                "message": "Item not found"
            });
        }
    } catch (error) {

        return res.status(400).json({
            message: error
        });

    }
});


//delete item from the database
router.delete('/:itemID', async (req, res) => {
    try {
        const removedItem = await Item.deleteOne({
            'id': req.params.itemID,
        });
        console.log(removedItem);
        if (removedItem.deletedCount != 0) {

            return res.status(200).json({ "message": "Item removed" });

        }
        else {
            return res.status(400).json({
                "message": "Item not found"
            });
        }
    } catch (error) {

        return res.status(400).json({
            "message": error
        });

    }
});

//get All items from the db
router.get('/', async (req, res) => {
    console.log("get all items");
    try {
        const allItems = await Item.find();

        return res.json({ "items": allItems }).status(200);


    } catch (error) {
        console.log(error);
        res.json({ "message": error }).status(400);

    }
});



//update a item in the db
router.patch('/:itemID', async (req, res) => {
    //in the update method we have to pass everyfield in the request body otherwise validation error will occur
    try {

        const error = itemValidation(req.body)

        if (error.error != null) {
            return res.status(400).send(error.error.details[0].message);
        }
        const updatedItem = await Item.updateOne({
            'id': req.params.itemID,
        }, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                // image: req.body.image,
                time: req.body.time,
                veg: req.body.veg,
                des: req.body.des

            }
        });

        if (updatedItem["nModified"] != 0) {
            return res.status(200).json({ "message": "Item updated successfully" });


        } else {
            return res.status(400).json({ "message": "Item not found " });



        }


    } catch (error) {

        return res.status(400).json({
            "message": error
        });

    }
});


//get all items from a category
router.get('/cat/:catID', async (req, res) => {
    console.log("get all items of the given category");
    try {
        const allItems = await Item.find(
            { 'category': req.params.catID }
        );

        return res.status(200).json({ "items": allItems });


    } catch (error) {
        console.log(error);
        res.status(400).json({ "message": error });

    }
});



module.exports = router;
