const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const env = require('dotenv/config')
env.config

//import routes
const authRoute = require('./routes/auth');



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



app.listen(8080, function () {
    console.log("server is runing");
})
