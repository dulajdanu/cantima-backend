const router = require('express').Router();
const University = require('../model/University');


//get all universities

router.get('/universities', async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities).status(200);
    } catch (error) {
        res.json({ "message": error }).status(400);
    }

})

module.exports = router;
