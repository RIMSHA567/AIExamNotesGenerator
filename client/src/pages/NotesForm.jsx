import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaFolder } from "react-icons/fa";
import { generateNotes } from "../services/api";
import { updateCredits } from "../redux/userSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Toggle = ({ label, value, onChange }) => {
  return (
    <div
      onClick={onChange}
      className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full cursor-pointer select-none"
    >
      <div
        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
          value ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            value ? "translate-x-5" : ""
          }`}
        />
      </div>

      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

const NotesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(true);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(true);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setProgress(10);

    const payload = {
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts,
    };

    try {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + Math.random() * 5 : prev));
      }, 200);

      const result = await generateNotes(payload);

      clearInterval(interval);
      setProgress(100);

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }

      navigate("/notes-result", { state: { notes: result } });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-10 rounded-2xl shadow-2xl  mt-15">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-7 mt-2">
          {/* Heading */}
          <h1 className="text-4xl font-bold mb-3">
            Turn Topics into <span className="text-indigo-600">Mastery</span>
          </h1>

          <p className="text-gray-600 mb-2">
            Transform any subject into structured, high-fidelity academic notes
            powered by intelligent synthesis.
          </p>

          {/* Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-2 space-y-2"
          >
            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic
              </label>

              <div className="relative">
                <FaFolder className="absolute left-3 top-3 text-gray-400" />

                <input
                  type="text"
                  placeholder="e.g. Quantum Entanglement or Roman Empire"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Class + Exam */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Class
                </label>

                <input
                  type="text"
                  placeholder="e.g Undergraduate or Grade 12"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Exam Type
                </label>

                <input
                  type="text"
                  placeholder="e.g MDCAT, NTS, SAT, GRE, Midterm, Final Exam"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              <Toggle
                label="Exam Revision Mode"
                value={revisionMode}
                onChange={() => setRevisionMode(!revisionMode)}
              />

              <Toggle
                label="Include Diagram"
                value={includeDiagram}
                onChange={() => setIncludeDiagram(!includeDiagram)}
              />

              <Toggle
                label="Include Charts"
                value={includeCharts}
                onChange={() => setIncludeCharts(!includeCharts)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-white font-semibold text-lg
            bg-linear-to-r from-indigo-600 to-purple-600
            hover:opacity-90 transition"
            >
              {loading
                ? `Generating... ${Math.floor(progress)}%`
                : "Generate Notes"}
            </button>

            {/* Progress */}
            {loading && (
              <div className="space-y-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-2 bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500 text-center">
                  ANALYZING ACADEMIC CONTEXT & SYNTHESIZING KEY CONCEPTS
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotesForm;
