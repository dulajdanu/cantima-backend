const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
app.use(express.json());


//routes middelwares
app.use('/api/user', authRoute);



app.listen(3000, process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1', () => {
    console.log("server is runing");
})