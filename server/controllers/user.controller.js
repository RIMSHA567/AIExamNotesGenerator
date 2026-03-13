import UserModel from "../models/user.model.js";

// Logged-in user ka data get karne ke liye
// 20*
export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId); // userId middleware se aata hai
    if (!user) return res.status(404).json({ message: "User not found" });
    // 21* go to api.js in frontend
    return res.status(200).json(user); // User data send karte hain dobar frontend ko api.js dekho file my dekho
  } catch (error) {
    return res.status(500).json({ message: `Current user error: ${error}` });
  }
};
