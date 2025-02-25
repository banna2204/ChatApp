import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "Not autherized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SACRET);
    if (!verified) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.user = user;
    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;