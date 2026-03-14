import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoins, FaUserCircle, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";

const Navbar = () => {
  const navigate = useNavigate();

  // Redux state
  const userData = useSelector((state) => state.user.userData);

  // Safe values
  const credits = userData?.credits ?? 0;
  const username = userData?.name ?? "";

  // UI states
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  const dispatch = useDispatch();

  // Logout function
  const handleLogout = async () => {
    try {
      // Backend logout request
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      // Redux store clear kar do
      dispatch(setUserData(null));

      // Dropdown / popup close
      setAvatarOpen(false);
      setCreditsOpen(false);

      // Redirect to login/auth page
      navigate("/auth");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full bg-white z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold">
            AI
          </div>
          <span className="font-semibold text-gray-900 text-sm md:text-base">
            AIExamsNotesGenerator
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
          {/* Credits Dropdown */}
          <div className="relative">
            <div
              onClick={() => setCreditsOpen(!creditsOpen)}
              className="flex items-center gap-2 text-gray-700 bg-gray-200 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
            >
              <FaCoins className="text-yellow-500" />
              <span className="text-sm font-medium">{credits} credits</span>
              <FaPlus className="text-xs text-gray-600" />
            </div>

            <AnimatePresence>
              {creditsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute mt-3 bg-white border rounded-xl shadow-xl p-4 z-50
                             right-0 sm:right-0 left-1/2 sm:left-auto transform -translate-x-1/2 sm:translate-x-0
                             w-[90vw] sm:w-64"
                >
                  <p className="text-sm text-gray-600 mb-3">
                    Need more credits? Upgrade your plan to generate more
                    AI-powered notes, diagrams, and exports.
                  </p>
                  <button
                    onClick={() => navigate("/pricing")}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Buy More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth / Avatar */}
          {!userData ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/auth")}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium"
            >
              Sign In
            </motion.button>
          ) : (
            <div className="relative">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer"
              >
                {username ? username.charAt(0).toUpperCase() : <FaUserCircle />}
              </motion.div>

              {/* Avatar Dropdown */}
              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-40 bg-white shadow-lg border rounded-lg overflow-hidden z-50"
                  >
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/history")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
