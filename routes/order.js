
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
                return res.status(200).json(info.ops[0]);
            }
            else {

                return res.status(400).json({ message: err });
            }
        })

    } catch (error) {
        return res.status(400).json({ "message": error });

    }
})



//complete order
router.put('/complete', function (req, res) {
    console.log("inside complete order");


    try {
        db.collection("orders").findOneAndUpdate(
            { _id: new mongodb.ObjectId(req.body._id) }, {
            $set: {
                status: "complete",
                cashier: req.body.cashier,
                type: req.body.type

            }



        },
            function (err, info) {
                // res.send('Success updated!')
                console.log(info);
                // return res.send(err);


            }
        );

        db.collection("history").findOneAndUpdate(
            { id: req.body.date }, //this should be the date formatted
            //we have to pass the date
            {
                $inc: req.body.doc //This doc should be sent from the front end


            },
            function (err, info) {
                // res.send('Success updated!')
                console.log(info);
                return res.send(err);


            }
        )

    } catch (error) {
        return res.status(400).json(error);

    }







})


//get past orders of a user


router.get('/getallorders/:userID', async (req, res) => {
    console.log("get all orders of a given user");
    console.log(req.params.userID);
    try {

        db.collection("orders").find({ "customerID": req.params.userID }).toArray(function (err, result) {
            // if (err) throw err;
            console.log(result);

            if (err) {
                return res.status(400).json({ "message": "Error occured" });

            } else {

                return res.status(200).json(result);

            }
            // db.close();
        });
        // let orders = await db.collection("orders").find(
        //     { "customerID": req.params.userID },
        //     // function (err, info) {
        //     //     // res.send('Success updated!')
        //     //     // console.log(orders);
        //     //     return res.json({ "message": "hi" });


        //     // }
        // );

        // console.log(orders.data);

        // if (orders) {
        //     return res.status(200).json({ 'orders': orders });

        // }
        // else {
        //     return res.status(400).json({ 'message': "error" });
        // }


    } catch (error) {
        console.log(error);
        res.status(400).json({ "message": error });

    }
});

module.exports = router;
