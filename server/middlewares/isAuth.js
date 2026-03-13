import jwt from "jsonwebtoken";

// Ye middleware check karta hai ki route protected hai aur user authenticated hai
// 17*
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Cookie se token read karte hain
    if (!token) return res.status(400).json({ message: "Token not found" });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET); // Token verify karte hain
    if (!verifyToken) return res.status(400).json({ message: "Invalid token" });

    req.userId = verifyToken.userId; // User id attach kar dete hain request me
    // 18*
    next(); // Controller execute hone de
  } catch (error) {
    return res.status(500).json({ message: `Auth error: ${error}` });
  }
};

export default isAuth;

// ....................complete flow:(jab login kiya , and then dobara reload kiya,dobaar
// reload py ya kam hota hy .......................................................... )

// Page load hota hai
//       ↓
// useEffect run hota hai
//       ↓
// getCurrentUser() function call hota hai
//       ↓
// Frontend backend ko request bhejta hai (/api/user/currentuser)
//       ↓
// Browser automatically cookie me token bhejta hai(server ko)
//       ↓
// Route par isAuth middleware run hota hai
//       ↓
// Middleware cookie se token read karta hai
//       ↓
// JWT token verify hota hai
//       ↓
//  User id attach kar dete hain request me
//       ↓
// Valid ho → next() → getCurrentUser controller run
//       ↓
// Controller DB se user data nikalta hai (user id ki madad sy)
//       ↓
// User data frontend ko bhej deta hai
//       ↓
// Redux me userData save ho jata hai
//       ↓
// App check karta hai:
// userData ? Home page : Auth page
