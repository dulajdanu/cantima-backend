const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const env = require('dotenv/config')
env.config
var cors = require('cors')


app.use(cors())

//import routes
const authRoute = require('./routes/auth');

//item route
const itemRoute = require('./routes/item');

//history route
const historyRoute = require('./routes/history');
const moment = require('moment');

//staff route
const staffRoute = require('./routes/staff');






//order route
const orderRoute = require('./routes/order');


//connect to DB 
mongoose.connect(
    'mongodb+srv://admin:admin1996@cluster0.9t4ho.mongodb.net/cantimadb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('connected to the datbase');

    }
)


//Middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


//routes middelwares
app.use('/api/user', authRoute);// every time the user goes to /api/user/ use the auth route


app.use('/api/item', itemRoute); //every time the user goes to the api/item use this itemRoute

app.use('/api/history', historyRoute);

app.use('/api/order', orderRoute);

app.use('/api/staff', staffRoute);





app.listen(8080, function () {
    console.log("server is runing");
})
