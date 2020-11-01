import express from 'express';
import authRoutes from './auth.route';
const router = express.Router(); 

/* Authentication Route */
router.use('/auth', authRoutes);

module.exports = router;
