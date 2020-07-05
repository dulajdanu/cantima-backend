const Joi = require('@hapi/joi');


//VALIDATION

//Register validation
const registerValidation = (requestBody) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),

    });

    return schema.validate(requestBody);
};


//Register validation
const loginValidation = (requestBody) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),

    });

    return schema.validate(requestBody);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;