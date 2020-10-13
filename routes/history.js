
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
router.post('/create', async (req, res) => {
    console.log("inside create history doc");
    //creating the history document initially
    //this should run in the admin panel when the day started
    let docId = moment().format('YYYY.MM.DD');

    try {


        //check whether there is already a document
        db.collection('history').findOne({ id: docId }, function (err, info) {
            // console.log(info);
            // return res.json(info);

            if (info == null) {
                db.collection('history').insertOne({ id: docId }, function (
                    err,
                    info
                ) {
                    if (err == null) {
                        console.log("here");
                        return res.status(200).json(info.ops[0]);
                    }
                    else {

                        return res.status(400).json({ message: err });
                    }
                })
            }
            else {
                return res.status(400).json({ "message": "document already exists" });
            }
        });




    } catch (error) {
        return res.status(400).json({ "message": error });

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
            console.log(info['lastErrorObject']['updatedExisting']);
            // return res.send(err);

            if (info['lastErrorObject']['updatedExisting'] == true) {

                return res.status(200).json({ 'message': "item added to showcase" });

            } else {
                return res.status(400).json({ 'message': "error occured" });


            }


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
            console.log(info['lastErrorObject']['updatedExisting']);
            // return res.send(err);

            if (info['lastErrorObject']['updatedExisting'] == true) {

                return res.status(200).json({ 'message': "item count incremented in showcase" });

            } else {
                return res.status(400).json({ 'message': "error occured" });


            }

        }
    )
})

//get today history documment

router.get('/today', function (req, res) {
    console.log("inside today function. this will return the today document");
    //we have to pass the id of the document which is date

    let docId = moment().format('YYYY.MM.DD');



    db.collection("history").findOne(
        { id: docId },

        function (err, info) {
            // res.send('Success updated!')
            // console.log(info['lastErrorObject']['updatedExisting']);
            // // return res.send(err);

            // if (info['lastErrorObject']['updatedExisting'] == true) {

            //     return res.status(200).json({ 'message': "item count incremented in showcase" });

            // } else {
            //     return res.status(400).json({ 'message': "error occured" });


            // }
            console.log(info);
            if (info != null) {

                return res.status(200).json({
                    'message': info
                });

            } else {

                return res.status(400).json({
                    'message': err
                });

            }

        }
    )
})



module.exports = router;
