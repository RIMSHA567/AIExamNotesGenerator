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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
    >
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="relative flex flex-col items-center justify-center text-white p-10 bg-linear-to-br from-indigo-600 via-purple-600 to-blue-600">
          {/* FLOATING ICONS */}

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 left-16 bg-white/20 p-3 rounded-xl"
          >
            <FaBrain size={22} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-24 right-16 bg-white/20 p-3 rounded-xl"
          >
            <FaChartBar size={22} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-10 bg-white/20 p-3 rounded-xl"
          >
            <FaFileAlt size={22} />
          </motion.div>

          {/* IMAGE */}

          <div className="rounded-xl overflow-hidden shadow-2xl mb-8">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a"
              className="w-64 h-48 object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-center">
            The Intelligent Atmosphere
          </h2>

          <p className="text-center text-white/80 max-w-sm">
            Transforming complex study materials into clear structured notes
            with the power of artificial intelligence.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 bg-gray-50">
          {/* GLASS CARD */}

          <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-8">
            {/* LOGO */}

            <div className="flex justify-center mb-4">
              <div className="bg-indigo-600 text-white p-2 rounded-full">
                <FaBrain size={18} />
              </div>
            </div>

            <h1 className="text-xl font-bold text-center mb-2">
              AIExamsNotesGenerator
            </h1>

            <p className="text-center text-gray-500 text-sm mb-6">
              Generate smart exam notes in seconds with AI
            </p>

            {/* FEATURES */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="space-y-3 mb-6"
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2"
                >
                  <span className="text-indigo-600 text-lg">{item.icon}</span>

                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* GOOGLE BUTTON */}

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              // 1*
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 bg-white shadow hover:shadow-lg transition"
            >
              <FcGoogle size={22} />
              Continue with Google
            </motion.button>

            <p className="text-xs text-center text-gray-400 mt-4">
              By continuing you agree to our
              <span className="text-indigo-600"> Terms of Service </span>
              and
              <span className="text-indigo-600"> Privacy Policy</span>.
            </p>

            <p className="text-center text-xs text-gray-400 mt-6">
              © 2024 AIExamsNotesGenerator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
