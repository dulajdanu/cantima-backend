const Joi = require('@hapi/joi');


//VALIDATION

//Register validation
const registerValidation = (requestBody) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        fullName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().length(10).required(),
        nic: Joi.string().required().min(10).max(12),
        credits: Joi.number().required().min(0),


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