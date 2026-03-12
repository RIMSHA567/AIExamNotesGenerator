// 1. express import kar rahe hain taake backend server create kar saken
import express from "express";

// 2. dotenv import kar rahe hain taake .env file ki variables use ho saken
import dotenv from "dotenv";

// 3. database connect karne wali file import kar rahe hain
import connectDb from "./utils/connectDb.js";

// 4. dotenv ko activate kar rahe hain taake .env file load ho jaye
dotenv.config();

// 5. express app create kar rahe hain (yehi hamara backend server hai)
const app = express();

// 6. PORT environment variable se le rahe hain, agar na mile to 5000 use hoga
const PORT = process.env.PORT || 5000;

// 7. basic test route bana rahe hain (browser me server check karne ke liye)
app.get("/", (req, res) => {
  // 8. client ko JSON response bhej rahe hain
  res.json({ message: "ExamNotes AI Backend Running" });
});

// 9. server ko given PORT par run kar rahe hain
app.listen(PORT, () => {
  // 10. console me message show hoga jab server successfully start ho jaye
  console.log(`Server running on port ${PORT}`);
  // 11. MongoDB database ko connect kar rahe hain
  connectDb();
});
