import express from 'express';
const router = express.Router();
import authCtrl from '../controllers/auth.controller';
import Joi from '../joi/auth.joi';
const { validate } = require('express-validation')

/* Login API */
router.post('/login', validate(Joi.login, { keyByField: true }), authCtrl.login);

/* Logout API */
router.post('/logout', authCtrl.logout);

module.exports = router;