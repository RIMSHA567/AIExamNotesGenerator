import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MermaidSetup from "../components/MermaidSetup";
import RechartSetup from "../components/RechartSetUp";
import { downloadPdf } from "../services/api.js";

import {
  FaBookOpen,
  FaBolt,
  FaChartLine,
  FaQuestionCircle,
  FaStar,
  FaProjectDiagram,
} from "react-icons/fa";

/* Markdown styling */
const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-indigo-700 mt-8 mb-4 border-b pb-2">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-indigo-700 mt-8 mb-4">{children}</h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-5 text-[17px]">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-2 text-gray-700">{children}</ul>
  ),

  li: ({ children }) => <li className="marker:text-indigo-500">{children}</li>,
};

const NotesResult = () => {
  const location = useLocation();
  const result = location.state?.notes;
  const [showRevision, setShowRevision] = useState(false);

  if (!result)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No notes found
      </div>
    );

  const data = result.data;

  const getSubTopicClass = (star) => {
    if (star === "★")
      return "bg-yellow-50 border-yellow-200 hover:shadow-yellow-200";
    if (star === "★★")
      return "bg-indigo-50 border-indigo-200 hover:shadow-indigo-200";
    return "bg-purple-50 border-purple-200 hover:shadow-purple-200";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* HEADER */}
        <header className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-3xl shadow-xl p-10 mb-10 overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Topic + Info */}
            <div className="space-y-4">
              <p className="text-sm tracking-widest uppercase text-indigo-200 font-semibold">
                AI Generated Study Notes
              </p>

              {/* TOPIC */}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
                {(result.topic || data.topic || "Topic").toUpperCase()}
              </h1>

              {/* CLASS + EXAM TYPE */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/20 px-4 py-1 rounded-full font-medium">
                  Class:{" "}
                  {(
                    result.classLevel ||
                    data.classLevel ||
                    "Class"
                  ).toUpperCase()}
                </span>

                <span className="bg-white/20 px-4 py-1 rounded-full font-medium">
                  ExamType:{" "}
                  {(
                    result.examType ||
                    data.examType ||
                    "ExamType"
                  ).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Quick Revision */}
              <button
                onClick={() => setShowRevision(!showRevision)}
                className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
              >
                Quick Revision
              </button>

              {/* Download */}
              <button
                onClick={() => downloadPdf(result)}
                className="flex items-center gap-2 bg-indigo-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-800 hover:scale-105 transition"
              >
                Download Notes
              </button>
            </div>
          </div>
        </header>

        {/* DETAILED NOTES */}
        {!showRevision && data.notes && (
          <section className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <FaBookOpen className="text-indigo-600 text-2xl" />
              <h2 className="text-3xl font-bold text-indigo-700">
                Detailed Notes
              </h2>
            </div>

            <div className="prose max-w-none">
              <ReactMarkdown components={markDownComponent}>
                {data.notes}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* IMPORTANT SUBTOPICS */}
        {data.subTopics && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaStar className="text-yellow-500 text-xl" />
              <h2 className="text-2xl font-bold">Important Sub Topics</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {["★", "★★", "★★★"].map((star) => (
                <div
                  key={star}
                  className={`rounded-2xl p-6 border shadow-sm transition hover:shadow-lg ${getSubTopicClass(star)}`}
                >
                  <h3 className="font-bold text-lg mb-4">
                    {star === "★"
                      ? "Very Important"
                      : star === "★★"
                        ? "Important"
                        : "Frequently Asked"}
                  </h3>

                  <ul className="space-y-2 text-gray-700">
                    {data.subTopics[star]?.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* QUICK REVISION */}
        {showRevision && data.revisionPoints && (
          <section className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaBolt className="text-yellow-500" />
              <h2 className="text-xl font-bold">Quick Revision Points</h2>
            </div>

            <ul className="space-y-2 text-gray-700">
              {data.revisionPoints.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </section>
        )}

        {/* CHARTS */}
        {data.charts?.length > 0 && (
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-indigo-600" />
              <h2 className="text-xl font-bold">Charts</h2>
            </div>

            <RechartSetup charts={data.charts} />
          </section>
        )}

        {/* DIAGRAM */}
        {data.diagram?.data && (
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <FaProjectDiagram className="text-purple-600" />
              <h2 className="text-xl font-bold">Concept Diagram</h2>
            </div>

            <MermaidSetup diagram={data.diagram.data} />
          </section>
        )}

        {/* QUESTIONS */}
        {data.questions && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaQuestionCircle className="text-rose-600" />
              <h2 className="text-2xl font-bold">Important Questions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
                <h3 className="font-bold mb-3">Short Questions</h3>
                <ul className="space-y-2">
                  {data.questions.short?.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="font-bold mb-3">Long Questions</h3>
                <ul className="space-y-2">
                  {data.questions.long?.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* OVERALL IMPORTANCE */}
        {data.Importance && (
          <section className="text-center bg-linear-to-r from-yellow-400 to-orange-400 text-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-3">Overall Importance</h2>
            <p className="text-lg font-semibold">{data.Importance}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default NotesResult;
