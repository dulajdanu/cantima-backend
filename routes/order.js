
const router = require('express').Router();
const mongodb = require('mongodb')
const moment = require('moment');

let db
let connectionString = 'mongodb+srv://admin:admin1996@cluster0.9t4ho.mongodb.net/cantimadb?retryWrites=true&w=majority';

mongodb.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        db = client.db();
        console.log("connected to db in the order route");
        // console.log(err);
    }
)

router.post('/create', function (req, res) {
    console.log("add order")
    //creating the history document initially
    //this should run in the admin panel when the day started
    let docId = moment().format('YYYY.MM.DD');

    try {
        db.collection('orders').insertOne({
            // id: docId 
            customerID: req.body.cusID,
            price: req.body.price,
            quantity: req.body.quantity,
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            items: req.body.items,
            status: "pending",

        }, function (
            err,
            info
        ) {
            if (err == null) {
                return res.json(info.ops[0]).status(200);
            }
            else {

                return res.json({ message: err }).status(400);
            }
        })

    } catch (error) {
        return res.json({ "message": error }).status(400);

    }
})

module.exports = router;
