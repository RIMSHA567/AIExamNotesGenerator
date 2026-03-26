// mongoose library import kar rahe hain
// yeh MongoDB database ke sath kaam karne ke liye hoti hai
import mongoose from "mongoose";

// Notes ka schema bana rahe hain
// schema matlab database ka structure (kon kon si fields hongi)
const notesSchema = new mongoose.Schema(
  {
    // Yeh field batati hai ke note kis user ka hai
    user: {
      // MongoDB ObjectId store karega
      type: mongoose.Schema.Types.ObjectId,

      // Iska reference UserModel se hoga
      ref: "UserModel",

      // Yeh field zaroori hai
      required: true,
    },

    // Note ka topic
    topic: {
      type: String,
      required: true,
    },

    // Class level (example: class 10, 11 etc)
    classLevel: String,

    // Exam type (example: midterm, final)
    examType: String,

    // Revision mode (agar true ho to revision notes)
    revisionMode: {
      type: Boolean,
      default: false,
    },

    // Diagram include karna hai ya nahi
    IncludeDiagram: Boolean,

    // Chart include karna hai ya nahi
    IncludeChart: Boolean,

    // AI se jo content aayega wo yahan store hoga
    // Mixed matlab yeh string bhi ho sakta hai aur JSON bhi
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },

  // timestamps true hone se MongoDB automatically
  // createdAt aur updatedAt fields bana deta hai
  { timestamps: true },
);

// Schema ko model me convert kar rahe hain
// Notes naam ka model ban raha hai
const Notes = mongoose.model("Notes", notesSchema);

// Model export kar rahe hain taake dusri files me use ho sake
export default Notes;
