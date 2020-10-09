const Joi = require('@hapi/joi');

//staff validation
const staffValidation = (requestBody) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        role: Joi.number().min(0).required(),

    });

    return schema.validate(requestBody);
};

module.exports.staffValidation = staffValidation;
