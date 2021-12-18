const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/user');
const validatorMiddleware = require('../../middlewares/validatorSchema');
const validationSchema = require('../../validations/user');

/* GET users listing. */
router.post('/contact', validatorMiddleware(validationSchema.contact, 'body'), userController.contactApi);
router.post('/subscribe', validatorMiddleware(validationSchema.subscribe, 'body'), userController.subscribeApi);

module.exports = router;
