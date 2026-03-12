// mongoose import kar rahe hain taake MongoDB ke sath schema aur model bana saken
import mongoose from "mongoose";

// User ka schema define kar rahe hain
const userSchema = new mongoose.Schema(
  {
    // User ka name
    name: {
      type: String, // Data type string hoga
      required: true, // Name dena zaroori hai
    },

    // User ki email
    email: {
      type: String, // Email string hogi
      required: true, // Email required hai
      unique: true, // Database me duplicate email allow nahi hogi
    },

    // User ke credits (AI notes generate karne ke liye use ho sakte hain)
    credits: {
      type: Number, // Number type
      default: 50, // Default 50 credits milenge jab user create hoga
      min: 0, // Credits 0 se kam nahi ho sakte
    },

    // Check karne ke liye ke user ke paas credits available hain ya nahi
    isCreditAvailable: {
      type: Boolean, // True / False
      default: true, // Default true hoga
    },

    // User ke notes ka reference store hoga
    notes: {
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
      ref: "Notes", // Notes collection ko reference karega
      default: [], // Default empty array
    },
  },
  {
    timestamps: true, // automatically createdAt aur updatedAt fields add karega
  },
);

// Schema se model create kar rahe hain

const UserModel = mongoose.model("UserModel", userSchema);
//ya table ka name ho ga-------------^
// Model export kar rahe hain taake dusri files me use ho sake
export default UserModel;
