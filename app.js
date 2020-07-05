const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv/config')
env.config

//import routes
const authRoute = require('./routes/auth');



//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('connected to the datbase');

    }
)


//Middlewares
app.use(express.json());


//routes middelwares
app.use('/api/user', authRoute);



app.listen(3000, () => {
    console.log("server is runing");
})