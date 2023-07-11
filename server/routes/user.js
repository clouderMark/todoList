import express from 'express';
import UserController from '../controlers/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = new express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/check', authMiddleware, UserController.check);

export default router;
