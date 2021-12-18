const contactModel = require('../../models/v1/contactUs');
const subscribeModel = require('../../models/v1/subscribe');
const logger = require('../../config/logger');
module.exports = {

    createContactData: async(data) => {
        logger.info('Inside createContact service');
        const response = await contactModel.create(data);
        return response;
    },

    subscribe: async(data) => {
        logger.info('Inside subscribe service');
        const emailCheck = await subscribeModel.findOne({ email: data.email });
        if(!emailCheck)
        {
            const response = await subscribeModel.create(data);
            return response;
        }

        return false;
    }
}