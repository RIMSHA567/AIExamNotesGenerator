import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-[#F8F9FC] pt-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <span className="bg-[#EEF2FF] text-[#6366F1] text-sm font-medium px-4 py-1.5 rounded-full">
            ✦ The Intelligence Atmosphere for Students
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-[#111827] leading-tight"
        >
          Transform Any Topic into <br />
          <span className="bg-linear-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Smart Exam Notes
          </span>
          <br /> in Seconds
        </motion.h1>

        {/* Description */}
        <p className="mt-6 text-[#6B7280] max-w-2xl mx-auto text-lg">
          Elevate your learning experience with AI-driven notes, interactive
          charts, and comprehensive summaries designed for high-performance
          retention.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-linear-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-3 rounded-full font-medium shadow-lg"
            onClick={() => navigate("/notes")}
          >
            Get Started
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gray-200 border border-gray-200 text-[#374151]"
          >
            <FaPlayCircle className="text-[#6366F1]" />
            See how it works
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
