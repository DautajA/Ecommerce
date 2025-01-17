import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routers token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET) // Merrni tokenin nga Authorization
    req.user = decode; 
    next();
  } catch (error) {
    console.log(error);
  }
};


// Admin Access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id); // Merrni përdoruesin nga DB me ID-në e dekoduar
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access"
      });
    }
    else{
    next(); 
    }// Përdoruesi është admin, mund të kaloni në funksionin tjetër
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message:"Error in admin middleware",
    });
  }
};

