
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
        console.log("connected to db in the history route");
        // console.log(err);
    }
)

//create the history document in the beginning
// router.post('/create', (req, res) => {
//     console.log("req.body")
//     try {
//         console.log('here')
//         let docId = moment().format('YYYY.MM.DD');
//         db.collection('data').insertOne({
//             id: "docId"
//         }).then((result) => {
//             console.log(result);
//         })
//     } catch (error) {
//         return res.json({ "message": error }).status(400);

//     }
// });
router.post('/create', function (req, res) {
    //creating the history document initially
    //this should run in the admin panel when the day started
    let docId = moment().format('YYYY.MM.DD');

    try {
        db.collection('history').insertOne({ id: docId }, function (
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

//add a new item to the history doc
//when the admin select a item from the admin panel and add it this document should update
router.put('/add-item', function (req, res) {
    console.log("inside add item");
    //we have to pass the id of the document which is date
    let itemIntialCount = `initial_count_${req.body.itemid}`
    let itemCount = `count_${req.body.itemid}`
    let rating = `rating_${req.body.itemid}`
    let ratingCount = `rating_count_${req.body.itemid}`


    console.log(itemIntialCount)
    db.collection("history").findOneAndUpdate(
        { id: req.body.id },
        {
            $set: {
                [itemIntialCount]: req.body.count,
                [itemCount]: 0,
                [rating]: 0,
                [ratingCount]: 0,
            }


        },
        function (err, info) {
            // res.send('Success updated!')
            console.log(info);
            return res.send(err);


        }
    )
})


//icrement count of the item again
router.put('/inc-item', function (req, res) {
    console.log("inside inc item");
    //we have to pass the id of the document which is date
    let itemIntialCount = `initial_count_${req.body.itemid}`


    console.log(itemIntialCount)
    db.collection("history").findOneAndUpdate(
        { id: req.body.id },
        {
            $inc: {
                [itemIntialCount]: req.body.count,
            }


        },
        function (err, info) {
            // res.send('Success updated!')
            console.log(info);
            return res.send(err);


        }
    )
})




module.exports = router;