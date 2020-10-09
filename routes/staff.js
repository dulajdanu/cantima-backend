const router = require('express').Router();
const Staff = require('../model/Staff');
const { staffValidation } = require("../staffValidation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {


    //LETS VALIDATE DATA BEFORE WE MAKE A USER
    console.log("Register staff");
    const error = staffValidation(req.body)

    if (error.error != null) {
        return res.status(400).json(error.error.details[0].message);
    }


    //check the user is already in the datbase
    const usernameExist = await Staff.findOne({
        'username': req.body.username
    });

    if (usernameExist) {
        return res.status(400).json({ "message": "Username is already in use" });
    }

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new staff object
    const staff = new Staff({
        username: req.body.username,
        role: req.body.role,
        password: hashPassword,
    })

    try {
        const savedStaff = await staff.save();
        res.status(200).json({
            "user": staff.username,
            "message": "New account created successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);

    }
})

//LOGIN
router.post('/login', async (req, res) => {
    //LETS VALIDATE DATA BEFORE login 



    //CHECK IF username EXIST
    const staff = await Staff.findOne({
        'username': req.body.username
    });

    if (!staff) {
        return res.status(400).json("Username doesn't exist ");
    }
    //now check the password is correct
    const validPass = await bcrypt.compare(req.body.password, staff.password);

    if (!validPass) return res.status(400).json('Invalid password');



    //create and assign a token

    // res.header('auth-token', token).send(token);



    res.json("You have successfully logged in").status(200);





});

module.exports = router;
