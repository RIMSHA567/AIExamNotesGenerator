import jwt from "jsonwebtoken";

// JWT token generate karne ka function
export const getToken = async (userId) => {
  try {
    //id and scret key ko milay kay token bnta hy
    const token = jwt.sign(
      { userId }, // Token me userId store karenge
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "7d" }, // Token 7 din valid
    );
    return token; // Token return karte hain
  } catch (error) {
    console.log("Token generation error:", error);
  }
};
