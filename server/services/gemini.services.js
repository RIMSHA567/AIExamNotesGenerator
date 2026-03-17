// Gemini AI API URL
// Ye Google ka generative language model endpoint hai
const Gemini_URI =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
// ==============================
// Function: AI se response generate karna
// Input: prompt (text jo AI ko bhejna hai)
// Output: AI ka generated content
// ==============================
export const generateGeminiResponse = async (prompt) => {
  try {
    // Fetch API se request bhej rahe hain Gemini API ko
    const response = await fetch(
      `${Gemini_URI}?key=${process.env.GEMINI_API_KEY}`,
      {
        // Method POST hai, kyunki hum data bhej rahe hain
        method: "POST",

        // Headers define kar rahe hain
        headers: {
          "Content-Type": "application/json", // Body JSON format me hogi
        },

        // Body me content bhej rahe hain
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }, // AI ke liye text prompt
              ],
            },
          ],
        }),
      },
    );

    // Agar response ok nahi hai, error throw karo
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    // Response ko JSON me convert kar rahe hain
    const data = await response.json();
    console.log("gemini kay ander");
    console.log(data);

    // AI ka text extract kar rahe hain
    // data.candidates[0].content.parts[0].text me AI ka response hota hai
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("gemini kay ander sy text nikalaa");
    console.log(text);

    // Agar text empty ho to error throw karo
    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    // Text ko clean kar rahe hain
    const cleanText = text
      .replace(/json/g, "") // unnecessary "json" words remove
      .replace(/\n/g, "") // line breaks remove
      .trim(); // starting & ending spaces remove
    console.log("text clean kiya");
    console.log(cleanText);

    // JSON parse karke return kar rahe hain
    return JSON.parse(cleanText);
  } catch (error) {
    // Agar koi bhi error aaye to console me print karo
    console.error("Gemini Fetch Error:", error.message);

    // Aur error ko throw kar do
    throw new Error("Gemini API fetch failed");
  }
};
// Gemini_URI me Google Gemini AI ka API endpoint store hai

// generateGeminiResponse(prompt) function AI se content generate karne ke liye bana hai

// fetch() se POST request Gemini API ko bheji jati hai

// Headers me Content-Type: application/json set kiya jata hai

// Body me prompt text JSON format me bheja jata hai

// Agar API response ok nahi → error throw hota hai

// Response ko JSON me convert kiya jata hai

// AI ka text data.candidates[0].content.parts[0].text se extract hota hai

// Text ko unnecessary words aur line breaks remove karke trim kiya jata hai

// Cleaned text ko JSON.parse() karke return kiya jata hai

// Agar koi error aaye → console me print aur error throw kar diya jata hai
