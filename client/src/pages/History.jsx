import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import NotesResult from "../pages/NotesResult.jsx";
import { serverUrl } from "../App.jsx";

function History() {
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credits ?? 0;

  // ================= HELPER TO NORMALIZE NOTE RESPONSE =================
  const normalizeNote = (res) => {
    if (res.data.content) return res.data; // res.data.content ke sath pura object
    if (res.data.data) return res.data; // res.data.data ke sath pura object
    return res.data;
  };

  // ================= GET NOTES =================
  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/notes/getnotes`, {
          withCredentials: true,
        });
        const notesArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];
        setTopics(notesArray);

        if (notesArray.length > 0) {
          openNotes(notesArray[0]._id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTopics(false);
      }
    };
    getNotes();
  }, []);

  // ================= OPEN NOTE =================
  const openNotes = async (noteId) => {
    setLoading(true);
    setActiveNoteId(noteId);

    try {
      const res = await axios.get(`${serverUrl}/api/notes/${noteId}`, {
        withCredentials: true,
      });
      const note = normalizeNote(res);
      setSelectedNote(note);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-5 mx-2 sm:mx-6 lg:mx-10">
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white text-indigo-500 px-6 py-4 flex justify-between items-center flex-wrap gap-4 shadow-2xl"
      >
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-xl sm:text-2xl font-bold">ExamNotes AI</h1>
          <p className="text-xs sm:text-sm text-indigo-500">
            AI-powered exam revision
          </p>
        </div>

        <button
          onClick={() => navigate("/pricing")}
          className="px-4 py-2 rounded-full bg-gray-300 text-indigo-500 font-bold text-sm"
        >
          Credits: {credits}
        </button>
      </motion.header>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        {/* ================= SIDEBAR (ONLY DESKTOP) ================= */}
        <div
          className="hidden lg:block w-72 
            bg-linear-to-b from-indigo-500 via-purple-500 to-indigo-600 
            text-white p-4 rounded-2xl overflow-y-auto shadow-lg
            max-h-[calc(100vh-96px)]"
        >
          {loadingTopics ? (
            <p className="text-center mt-4">Loading topics...</p>
          ) : topics.length === 0 ? (
            <p className="text-center mt-4">No topics found</p>
          ) : (
            <ul className="space-y-3">
              {topics.map((t) => (
                <li
                  key={t._id}
                  onClick={() => openNotes(t._id)}
                  className={`cursor-pointer rounded-xl p-3 transition 
                  ${
                    activeNoteId === t._id
                      ? "bg-white/30"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <p className="text-sm font-bold tracking-wide uppercase text-white">
                    {t.topic}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-semibold uppercase">
                    {t.classLevel && (
                      <span className="px-3 py-1 rounded-full bg-white/20">
                        Class: {t.classLevel}
                      </span>
                    )}
                    {t.examType && (
                      <span className="px-3 py-1 rounded-full bg-purple-300/20">
                        {t.examType}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ================= MOBILE TOP SCROLL ================= */}
        <div className="lg:hidden overflow-x-auto flex gap-3 px-1 pb-2">
          {topics.map((t) => (
            <div
              key={t._id}
              onClick={() => openNotes(t._id)}
              className={`min-w-50 cursor-pointer rounded-xl p-3 text-white 
              ${
                activeNoteId === t._id
                  ? "bg-linear-to-r from-indigo-500 to-purple-500"
                  : "bg-gray-400"
              }`}
            >
              <p className="text-xs font-bold uppercase">{t.topic}</p>
              <p className="text-[10px] mt-1">
                {t.classLevel} • {t.examType}
              </p>
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-96px)]">
          {loading && (
            <p className="text-center text-gray-500">Loading notes...</p>
          )}

          {!loading && !selectedNote && (
            <div className="text-center text-gray-400">Select a topic</div>
          )}

          {!loading && selectedNote && <NotesResult notes={selectedNote} />}
        </div>
      </div>
    </div>
  );
}

export default History;
