import jwt from "jsonwebtoken";
import { User } from "./../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");   
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const authorRoute = (req, res, next) => {
  if (req.user && req.user.role === "author") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Authors only" });
  }
};
