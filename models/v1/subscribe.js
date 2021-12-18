const mongoose = require('mongoose')

const subscribeSchema = mongoose.Schema(
	{
		email: { type: String },
	},
	{ timestamps: true, versionKey: false },
)

module.exports = mongoose.model('Subscribe', subscribeSchema)