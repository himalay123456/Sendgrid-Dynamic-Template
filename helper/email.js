const sgMail = require('@sendgrid/mail');
const logger = require('../config/logger.js');
const constants =  require('../config/constant.js');
require('dotenv').config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const mailAdmin = (data) => {
	const obj = {
		to: 'himalayshankar31@gmail.com',
		from: {
            email: process.env.SEND_GRID_SENDER_EMAIL,
            name: 'Elitecash'
        },
		subject: '',
		templateId: '',
		dynamic_template_data: {},
	};
	let emailTemplateId = '';
	constants.EMAIL_TEMPLATES.forEach((item) => {
		if (Object.keys(item)[0] === data.templateType) {
			emailTemplateId = item[data.templateType];
		}
	});
	switch (data.templateType) {
		case 'SUBSCRIBE': {
			obj.subject = 'User Subscribed';
			obj.templateId = emailTemplateId;
			obj.dynamic_template_data = {
				body: 'Subscribtion success',
                subject: 'User Subscribed'
			};
			break;
		}
		case 'CONTACT_US': {
			obj.subject = 'User Tried To Contact';
			obj.templateId = emailTemplateId;
			obj.dynamic_template_data = {
				email: data.email,
				name: data.name,
				message: data.message,
                subject: 'User Tried To Contact'
			};
			break;
		}
		default: {
			break;
		}
	}
	sgMail.send(obj, (err, result) => {
		if (err) {
			logger.error(`Inside mailHelper helper : ${err}`);
		} else {
			logger.info(`Inside mailHelper helper : ${result}`);
		}
	});
    return;
};

const mailHelper = async(data) => {
    console.log(data)
	const obj = {
		to: data.receiver,
		from:  {
            email: process.env.SEND_GRID_SENDER_EMAIL,
            name: 'Elitecash'
        },
		subject: '',
		templateId: '',
		dynamic_template_data: {},
	};
	let emailTemplateId = '';
	constants.EMAIL_TEMPLATES.forEach((item) => {
		if (Object.keys(item)[0] === data.templateType) {
			emailTemplateId = item[data.templateType];
		}
	});
	switch (data.templateType) {
		case 'SUBSCRIBE': {
			obj.subject = 'Subscribe to Elitecas.io';
			obj.templateId = emailTemplateId;
			obj.dynamic_template_data = {
				body: 'Subscribtion success',
                subject : 'Subscribe to Elitecas.io'
			};
			break;
		}
		case 'CONTACT_US': {
			obj.subject = 'Contact Us Details';
			obj.templateId = emailTemplateId;
			obj.dynamic_template_data = {
				email: data.email,
				name: data.name,
				message: data.message,
                subject : 'Contact Us Details'
			};
			break;
		}
		default: {
			break;
		}
	}
    await mailAdmin(data);
	return sgMail.send(obj, (err, result) => {
        console.log('sent')
		if (err) {
			logger.error(`Inside mailHelper helper : ${err}`);
		} else {
			logger.info(`Inside mailHelper helper : ${result}`);
		}
	});
};

module.exports = mailHelper;