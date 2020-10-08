const Joi = require('@hapi/joi');

//Register validation
const itemValidation = (requestBody) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        id: Joi.number().min(2).required(),
        price: Joi.number().min(5).required(),
        category: Joi.number().min(0).required().max(3), //there are only 4 categories and they are marked from 0 1 2 3
        image: Joi.string().required(),

    });

    return schema.validate(requestBody);
};

module.exports.itemValidation = itemValidation;
