import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";

// Backend se current user data get

// 14*
export const getCurrentUser = async (dispatch) => {
  try {
    //yahan result my user diya gya hy current user cookie sy nikal kay
    // 15* go to backend in index.js

    //22*
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true,
    });

    // ya store my rakha diya, hy jab dispatch chly ga componnnet dobara app.jsx pora repaint ho ga ,and user data ki base my sab kuch new dikhay ga ui py .
    // 23*
    dispatch(setUserData(result.data)); // Redux me save
  } catch (error) {
    // console.log(error);
    console.log(error.response?.data || error.message);
  }
};

// ============================
// Generate notes function (AI se)
// payload = data object jo API ko bheja jata hai.

// like this :
// const payload = {
//   topic: "Operating System",
//   classLevel: "BSCS",
//   examType: "Final",
//   revisionMode: true,
//   includeDiagram: true,
//   includeChart: false
// };
export const generateNotes = async (payload) => {
  try {
    // Server me POST request bhej rahe hain
    // payload me topic, classlevel, examType, etc. hoga
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      {
        withCredentials: true, // cookie ya token ke sath request
      },
    );
    console.log(result);
    // Console me response dekh sakte hain
    console.log(result.data);

    // Function ke caller ko data return kar rahe hain
    return result.data;
  } catch (error) {
    // Agar request fail ho jaye to error print karein
    console.log(error);
  }
};

export const downloadPdf = async (result) => {
  try {
    // ================= API CALL =================
    // Backend ko POST request bhej rahe hain PDF generate karne ke liye
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      {
        result: result.data, // ✅ Sirf actual data bhejna (important fix)
      },
      {
        responseType: "blob",
        // blob → binary data (PDF file) receive karne ke liye zaroori hai

        withCredentials: true,
        // cookies/session bhejne ke liye (agar auth use ho raha ho)
      },
    );

    // ================= BLOB CREATE =================
    // Backend se jo PDF ayi hai usko blob object me convert kar rahe hain

    // binary form my pdf milti hy,usy is langu my convert karna kay browser samj saky us kay liya blob use kar rahy ,
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    // ================= URL CREATE =================
    // Blob ka temporary URL banaya ja raha hai browser me
    const url = window.URL.createObjectURL(blob);

    // ================= DOWNLOAD TRIGGER =================
    // Ek invisible <a> (anchor tag) create kiya
    const link = document.createElement("a");

    link.href = url; // URL assign kiya
    link.download = "ExamNotesAI.pdf"; // file ka naam set kiya

    link.click(); // automatically click karwaya → download start

    // ================= CLEANUP =================
    // Temporary URL delete kar diya (memory free karne ke liye)
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error); // error aaye to console me show karo
  }
};
