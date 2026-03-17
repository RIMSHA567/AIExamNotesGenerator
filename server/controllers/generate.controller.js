import Notes from "../models/notes.model.js";

// User model import kar rahe hain
import UserModel from "../models/user.model.js";

// Gemini service import kar rahe hain (AI response generate karne ke liye)
import { generateGeminiResponse } from "../services/gemini.services.js";

// Prompt builder import kar rahe hain (AI ke liye input text prepare karne ke liye)
import { buildPrompt } from "../utils/promptBuilder.js";

// ==============================
// Generate Notes Controller
// ==============================
export const generateNotes = async (req, res) => {
  try {
    // Request body se data le rahe hain
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false, // agar na mile to default false
      includeDiagram = false, // agar na mile to default false
      includeCharts = false, // agar na mile to default false
    } = req.body;

    console.log("reqofbody");
    console.log(req.body);

    // Agar topic nahi diya to error return karo
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // User database me dhund rahe hain id se
    const user = await UserModel.findById(req.userId);

    // Agar user nahi mila to error return karo
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    // Agar user ke paas credits kam hain to error return karo
    if (user.credits < 10) {
      user.isCreditAvailable = false; // variable my majoood object chnage kiya
      await user.save(); //ab is pora varalble my majoood data ko database my save kiya
      return res.status(403).json({ message: "Insufficient credits" });
    }

    // AI ke liye prompt generate kar rahe hain
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
    });

    // Gemini AI se response le rahe hain
    const aiResponse = await generateGeminiResponse(prompt);
    console.log("aiResponse");
    console.log(aiResponse);

    // Notes database me save kar rahe hain
    const notes = await Notes.create({
      user: user._id, // ye note kis user ka hai
      topic,
      classLevel,
      examType,
      revisionMode,
      IncludeDiagram: includeDiagram, // frontend → backend mapping
      IncludeChart: includeCharts, // frontend → backend mapping
      content: aiResponse, // AI ka content
    });

    console.log("databse kay bad ka notes ");
    console.log(notes);

    // User ke notes array me naya note add kar rahe hain
    // Ye check karta hai ke user.notes ek array (list) hai ya nahi.
    if (Array.isArray(user.notes)) {
      user.notes.push(notes._id); // mtlb Ahad ny ya notes generte karwaeeen hy (id ya hy )
    }
    //     like this:
    //     {
    //   "name": "Ali",
    //   "notes": ["note1", "note2"]
    // }

    // User ke credits update kar rahe hain
    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;
    // await user.save(); is sy pehlay takuser variable my updation ho rahi thi jis may hm nay databse sy user rakhwaya tha
    await user.save();
    //  is kay bad databse my bi update kr diya

    // Success response bhej rahe hain
    return res.status(200).json({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
      data: aiResponse, // AI ka content
      noteId: notes._id, // Note ka id
      creditsLeft: user.credits, // remaining credits
    });
  } catch (error) {
    // Agar koi error aaye to console me print karein
    console.error(error);

    // Error response bhej rahe hain
    res.status(500).json({
      error: "AI generation failed",
      message: error.message,
    });
  }
};

// Request body se topic, classlevel, examType, diagram aur chart ka data liya jata hai

// Agar topic missing ho to error return kiya jata hai

// Database se user find kiya jata hai req.userId ke through

// Agar user ke credits < 10 ho to isCreditAvailable = false set karke error return

// buildPrompt() se AI ke liye prompt prepare hota hai

// generateGeminiResponse() se AI notes generate kiye jate hain

// AI ka content Notes collection me save hota hai

// User ke notes array me naya note ID add kiya jata hai

// User ke credits se 10 deduct kiye jate hain

// await user.save() se user data database me update hota hai

// Response me AI content, note ID aur remaining credits bheje jate hain
