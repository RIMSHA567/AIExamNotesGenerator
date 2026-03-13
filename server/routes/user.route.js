import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
// import isAuth from "../middleware/isAuth.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

// Protected route for current user
// isAuth middleware ka maksad hai cookie se token check karna aur verify karna.
// Agar token valid ho to user ko protected route access mil jata hai, warna error aa jata hai.

// 16* go to miidleware my is auth.js

// 19* go to user controller
userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;

// concept of protectd route

// Jab kisi route par middleware (jaise isAuth) laga ho jo request ko pehle check karta hai, to us route ko protected route kehte hain.

// Request → Middleware check → Agar allow → Controller run
//                           → Agar reject → Error

// userRouter.get("/currentuser", isAuth, getCurrentUser);
// Yahan /currentuser protected route hai kyunki pehle isAuth middleware token verify karega.
