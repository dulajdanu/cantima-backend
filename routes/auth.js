const router = require('express').Router();
const User = require('../model/User');
const { loginValidation, registerValidation } = require("../validation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {


    //LETS VALIDATE DATA BEFORE WE MAKE A USER
    console.log("Register page");
    const error = registerValidation(req.body)

    if (error.error != null) {
        return res.status(400).send(error.error.details[0].message);
    }


    //check the user is already in the datbase
    const emailExist = await User.findOne({
        'email': req.body.email
    });

    if (emailExist) {
        return res.status(400).json({ "message": "Email is already in use" });
    }

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        fullName: req.body.fullName,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber,
        credits: req.body.credits,
    })

    try {
        const savedUser = await user.save();
        res.status(200).json({
            "user": user.id,
            "message": "New account created successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);

    }
})

//LOGIN
router.post('/login', async (req, res) => {
    //LETS VALIDATE DATA BEFORE login 
    console.log("Res");
    const error = loginValidation(req.body)
    console.log(error);

    if (error.error != null) {
        return res.status(400).send(error.error.details[0].message);
    }

    //CHECK IF A EMAIL EXIST
    const user = await User.findOne({
        'email': req.body.email
    });

    if (!user) {
        return res.status(400).send("Email or password is wrong");
    }
    //now check the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send('Invalid password');



    //create and assign a token
    const token = jwt.sign(
        { _id: user._id, }, "the token secret"

    );
    // res.header('auth-token', token).send(token);



    res.status(200).send("You have successfully logged in");





});

module.exports = router;
