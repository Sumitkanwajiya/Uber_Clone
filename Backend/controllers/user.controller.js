import User from "../models/user.model.js";
import Blacklist from "../models/blacklist.model.js";
import {userService} from "../services/user.service.js";
import { validationResult } from 'express-validator';

export const registerUser = async (req, res,next) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    try {
        const user = await userService.createUser({ 
            firstname: fullname.firstname,
             lastname: fullname.lastname,
              email,
               password: hashedPassword });
         
        const token = user.generateAuthToken();

        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        next(error);
    }

    
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        next(error);
    }

}


export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (token) {
            await Blacklist.create({ token });
        }   
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }

}

