
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
        console.log(err);
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

module.exports = router;
