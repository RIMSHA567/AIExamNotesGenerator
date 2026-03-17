import express from "express";
// Express import kar rahe hain, jo Node.js me server banane ka framework hai

import cors from "cors";
// CORS import kar rahe hain, taake frontend (React) aur backend (Node) alag ports par communicate kar saken

import cookieParser from "cookie-parser";
// Cookies read aur write karne ke liye middleware

import dotenv from "dotenv";
// .env file se environment variables read karne ke liye

import connectDb from "./utils/connectDb.js";
// MongoDB connect karne ka function import kar rahe hain

import authRouter from "./routes/auth.route.js";
// Authentication related routes import kar rahe hain (Google login etc.)

import userRouter from "./routes/user.route.js";
// User related routes import kar rahe hain (current user get karna etc.)

import notesRouter from "./routes/notes.route.js";

dotenv.config();
// .env file load kar rahe hain, jahan secret keys aur URLs stored hoti hain

const app = express();
// Express app create kar rahe hain, jo server ko control karega

// use hr anay wali request pr implement hota hy
// CORS configuration (frontend and backend ko connnect kiya)
app.use(
  cors({
    origin: "http://localhost:5173", // yahan sy anay wali request sunnni hy
    // Ye frontend ka address hai, sirf ye allow hoga backend se connect
    credentials: true,
    // Cookies allow karne ke liye
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // Ye HTTP methods allowed hain
  }),
);

// JSON parse
app.use(express.json());
// Body me jo JSON data aayega, usko automatically parse kar dega (mtlb samj kay redable json form my cnvrt karna)

// cookies read karne ke liye(mtlb jb bi browser sy request ay gi sath cookie bi ay gi ,is sy read kar sakya gay)
app.use(cookieParser());
// Browser se aane wali cookies ko read karne ke liye

// test route
app.get("/", (req, res) => {
  // Ye route check karne ke liye hai ke server chal raha hai ya nahi
  res.json({
    message: "ExamNotes AI Backend Running",
  });
});

//PEHLAY ROUTE PY,THEN WAHAN SY CONTROLLER PY
// routes

// 4*
app.use("/api/auth", authRouter);
// "/api/auth" ke requests ke liye authRouter use hoga (Google login)
app.use("/api/user", userRouter);
// "/api/user" ke requests ke liye userRouter use hoga (current user etc.)
app.use("/api/notes", notesRouter);

// server port
const PORT = process.env.PORT || 5000;
// Server kis port par chalega, agar .env me na ho to 5000 default

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Console me message aayega ke server chal raha hai

  // database connect
  connectDb();
  // Server start hote hi MongoDB connect karenge
});
