import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  FaBrain,
  FaFileAlt,
  FaChartBar,
  FaFileDownload,
  FaCoins,
} from "react-icons/fa";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

import { serverUrl } from "../App";

export default function Auth() {
  const dispatch = useDispatch();

  // =========================
  // GOOGLE AUTH LOGIC
  // =========================
  // 2*
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      // ik user milta hy pai py request sy yahan

      // 3*
      // 8*
      const result = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true },
      );
      //dispatch sy store may value set kartay haen,and then jo value store my hoti h wo sab pages ka liya available ho gati hy,koi bi use selector sy wo value la sakta hy
      // 9*
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const features = [
    { icon: <FaCoins />, text: "50 Free Credits" },
    { icon: <FaFileAlt />, text: "Generate Exam Notes" },
    { icon: <FaFileAlt />, text: "Generate Project Notes" },
    { icon: <FaChartBar />, text: "Charts & Graphs" },
    { icon: <FaFileDownload />, text: "Free PDF Download" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4"
    >
      {/* MAIN CONTAINER */}
      <div className="w-full mt-5 max-w-3xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden mx-auto my-auto">
        {/* LEFT SIDE */}
        <div className="hidden md:flex relative flex-col items-center justify-center text-white p-6 bg-linear-to-br from-indigo-600 via-purple-600 to-blue-600">
          {/* FLOATING ICONS */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-8 bg-white/20 p-2 rounded-xl"
          >
            <FaBrain size={16} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 right-8 bg-white/20 p-2 rounded-xl"
          >
            <FaChartBar size={16} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-4 bg-white/20 p-2 rounded-xl"
          >
            <FaFileAlt size={16} />
          </motion.div>

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-2xl mb-6">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
              className="w-48 h-32 object-cover"
            />
          </div>

          <h2 className="text-xl font-bold mb-1 text-center">
            The Intelligent Atmosphere
          </h2>

          <p className="text-center text-white/80 max-w-xs text-sm">
            Transforming complex study materials into clear structured notes
            with the power of artificial intelligence.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-4 bg-gray-50">
          {/* GLASS CARD */}
          <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6">
            {/* LOGO */}
            <div className="flex justify-center mb-3">
              <div className="bg-indigo-600 text-white p-2 rounded-full">
                <FaBrain size={16} />
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-lg font-bold text-center mb-1">
              AIExamsNotesGenerator
            </h1>

            {/* SUBTITLE */}
            <p className="text-center text-gray-500 text-sm mb-4">
              Generate smart exam notes in seconds with AI
            </p>

            {/* FEATURES LIST */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="space-y-2 mb-4"
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1"
                >
                  <span className="text-indigo-600 text-base">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* GOOGLE AUTH BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGoogleAuth} // 1*
              className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 bg-white shadow hover:shadow-lg transition text-sm"
            >
              <FcGoogle size={20} />
              Continue with Google
            </motion.button>

            {/* TERMS */}
            <p className="text-xs text-center text-gray-400 mt-3">
              By continuing you agree to our
              <span className="text-indigo-600"> Terms of Service </span>
              and
              <span className="text-indigo-600"> Privacy Policy</span>.
            </p>

            {/* COPYRIGHT */}
            <p className="text-center text-xs text-gray-400 mt-3">
              © 2024 AIExamsNotesGenerator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
