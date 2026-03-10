import Captain from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const captainAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    req.captain = captain;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default captainAuthMiddleware;
