import express from 'express';
import { body } from 'express-validator';
import { registerUser,loginUser,getUserProfile,logoutUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], loginUser);  


router.get('/profile',authMiddleware,
    getUserProfile);

router.get('/logout', authMiddleware ,logoutUser
);


export default router;