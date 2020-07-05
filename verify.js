const jwt = require('jsonwebtoken');

//we create a middleware function so it can be used in the routes
function auth_verify(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access denied");

    try {
        const
    } catch (error) {

    }
}