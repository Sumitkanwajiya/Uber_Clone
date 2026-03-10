import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Blacklist from '../models/blacklist.model.js';

export const authMiddleware = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
   if(!token) {
    return res.status(401).json({ message: 'unauthorized' });
   }

   const isEmailBlacklisted = await Blacklist.findOne({ token });
   if (isEmailBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
   }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const user = await User.findById(decoded._id);
   req.user = user;
     return next();
   } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
   }

}
