const mongoose = require('mongoose')

const contactUsSchema = mongoose.Schema(
	{
		name: { type: String },
		email: { type: String },
		message: { type: String },
	},
	{ timestamps: true, versionKey: false },
)

module.exports = mongoose.model('Contact', contactUsSchema)