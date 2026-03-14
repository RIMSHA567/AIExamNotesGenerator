import { motion } from "framer-motion";
import {
  FaBook,
  FaFolderOpen,
  FaProjectDiagram,
  FaFilePdf,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBook />,
    title: "Exam Notes",
    desc: "Generate tailored study guides optimized for your specific exam format and curriculum.",
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    icon: <FaFolderOpen />,
    title: "Project Notes",
    desc: "Convert lengthy documentation and complex research into concise actionable project overviews.",
    color: "text-teal-600 bg-teal-100",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Diagrams",
    desc: "Visualize ideas and concepts with AI-generated charts and logical flow trends.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: <FaFilePdf />,
    title: "PDF Download",
    desc: "One-click high fidelity export for print-ready guides that you can take anywhere.",
    color: "text-blue-600 bg-blue-100",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#F8F9FC] py-15 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg mb-4 ${feature.color}`}
            >
              {feature.icon}
            </div>

            <h3 className="font-semibold text-lg mb-2 text-[#111827]">
              {feature.title}
            </h3>

            <p className="text-[#6B7280] text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
