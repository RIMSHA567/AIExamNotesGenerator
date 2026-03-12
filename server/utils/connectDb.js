// 1. mongoose import kar rahe hain taake MongoDB database se connect ho saken
import mongoose from "mongoose";

// 2. database connect karne ka async function bana rahe hain
const connectDb = async () => {
  try {
    // 3. mongoose se MongoDB Atlas ko connect kar rahe hain
    // MONGODB_URL .env file se aa rahi hai
    console.log("start");
    await mongoose.connect(process.env.MONGODB_URL);

    // 4. agar connection successful ho jaye to console me message show hoga
    console.log("DB Connected");
  } catch (error) {
    // 5. agar connection fail ho jaye to error message show hoga
    console.log("DB Error");
    console.log(error);
  }
};

// 6. is function ko export kar rahe hain taake index.js me use ho sake
export default connectDb;
