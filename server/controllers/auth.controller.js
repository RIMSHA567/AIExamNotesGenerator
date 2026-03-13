import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// Google Authentication controller

// 6*
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body; // Frontend se name aur email receive

    // Check if user already exists
    let user = await UserModel.findOne({ email });

    // Agar user exist nahi karta to naya user create karo
    if (!user) {
      user = await UserModel.create({ name, email });
    }

    // database me user store karna identity ke liye hota hai, aur token + cookie ka purpose user ko login state me rakhna hota hai taake wo bar-bar login na kare.

    // JWT token generate
    const token = await getToken(user._id);

    // Token cookie me save

    // inspect,applications,cookies,loaclhost,token nazar a gy ga
    res.cookie("token", token, {
      httpOnly: true, // JS se access nahi hoga
      secure: false, // production me true karte hain (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // 7* go to auth.jsx
    return res.status(200).json(user); // User data send
  } catch (error) {
    return res.status(500).json({ message: `Google signup error: ${error}` });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    // Cookie delete kar rahe hain (token remove)
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Logout Error: ${error}`,
    });
  }
};

// Logout Logic

// clearCookie("token")
// → Browser se JWT cookie delete ho jati hai.

// User automatically logout ho jata hai
// → Kyunki next request me token nahi hoga.

// Status 200
// → Success message return karta hai.
