const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const validationSchema = {

	contact: {
		name: Joi.string()
			.required(),
		email: Joi.string().email({ tlds: { allow: false } }).required(),
		message: Joi.string()
        .required(),
    },
	subscribe: {
		email: Joi.string().email({ tlds: { allow: false } }).required(),
    }
}

module.exports = validationSchema;