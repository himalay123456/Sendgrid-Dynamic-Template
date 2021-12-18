const logger = require('../../config/logger');
const requestHandler = require('../../helper/requestHandler');
const dbServices = require('../../dbServices/v1/user');
const message = require('../../config/message');
const email = require('../../helper/email');

const { handleResponse, handleError } = requestHandler;
const{ createContactData, subscribe } = dbServices;

module.exports = {

    contactApi : async(req, res) => {
        logger.info('Inside createContact controller');
        try{
            const data = await createContactData(req.body);
            if(data)
            {
                const mailDataToSend = {
                    templateType: 'CONTACT_US',
                    receiver: req.body.email,
                    name:req.body.name,
                    email:req.body.email,
                    message: req.body.message
                };
                email(mailDataToSend);
                return handleResponse({
                    res,
                    msg: message.CREATE_CONTACT_SUCCESS,
                    data: {},
                });
            }else{
                return handleError({
					res,
					statusCode: 400,
					err: message.CREATE_CONTACT_FAIL,
				});
            }
        }catch(err){
            return handleError({
                            res,
                            err_msg: 'Server Error',
                            err: err,
                        })
        }
    },

    subscribeApi : async(req, res) => {
        logger.info('Inside subscribe controller');
        try{
            const data = await subscribe(req.body);
            if(data)
            {
                const mailDataToSend = {
                    templateType: 'SUBSCRIBE',
                    receiver: req.body.email,
                };
                email(mailDataToSend);
                return handleResponse({
                    res,
                    msg: message.SUBSCRIBE_SUCCESS,
                    data: {},
                });
            }else{
                return handleError({
					res,
					statusCode: 400,
					err: message.SUBSCRIBE_FAIL,
				});
            }
        }catch(err){
            return handleError({
                            res,
                            err_msg: 'Server Error',
                            err: err,
                        })
        }
    }

}