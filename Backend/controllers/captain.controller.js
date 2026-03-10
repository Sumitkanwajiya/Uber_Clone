import Captain from "../models/captain.model.js";
import { captainService } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import Blacklist from "../models/blacklist.model.js";

export const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, vehicle } = req.body;

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain with this email already exists" });
    }

    const hashedPassword = await Captain.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      vehicle,
    });

    const token = captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(201).json({ captain, token });
  } catch (error) {
    next(error);
  }
};

export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Login successful", captain, token });
  } catch (error) {
    next(error);
  }
};

export const getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

export const logoutCaptain = async (req, res, next) => {
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
};