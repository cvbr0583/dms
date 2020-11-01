import express from 'express';
import authCtrl from '../controllers/auth.controller';
const router = express.Router();

/* Login API */
router.post('/login', authCtrl.login);

/* Logout API */
router.post('/logout', authCtrl.logout);

module.exports = router;