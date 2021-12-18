const mongoose = require('mongoose')
const logger = require('./logger')
require('dotenv').config()

module.exports = {
	mongoInit: async () => {
		try {
			await mongoose.connect(process.env.DB_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			console.log('Database Connected .')
			// logger.info('DataBase Connected')
		} catch (e) {
			logger.error(e.message)
		}
	},
}