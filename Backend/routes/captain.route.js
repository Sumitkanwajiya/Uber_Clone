import { body } from 'express-validator';
import Captain from '../models/captain.model.js';
import { loginCaptain, getCaptainProfile, registerCaptain,logoutCaptain } from '../controllers/captain.controller.js';
import captainAuthMiddleware from '../middleware/captainAuth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', [
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 char'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('vehicle color min 3 char'),
  body('vehicle.plate').isLength({ min: 5 }).withMessage('vehicle plate min 5 char'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('vehicle cap min 1'),
  body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('invalid vehicle type')
], registerCaptain);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
], loginCaptain);

router.get('/profile', captainAuthMiddleware, getCaptainProfile);

router.get('/logout', captainAuthMiddleware, logoutCaptain);

export default router;
