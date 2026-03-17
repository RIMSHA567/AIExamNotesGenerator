// React ko import kar rahe hain taake component bana saken
import React from "react";

// Recharts library se different chart components import kar rahe hain
import {
  BarChart, // Bar chart banane ke liye
  Bar, // Bar chart ke bars (rectangles)
  Cell, // Har bar ya slice ko color dene ke liye
  Line, // Line chart ki line
  LineChart, // Line chart ka container
  Pie, // Pie chart ka circle part
  PieChart, // Pie chart ka main container
  ResponsiveContainer, // Chart ko responsive banata hai (screen ke hisaab se size change)
  Tooltip, // Mouse hover par data show karta hai
  XAxis, // Horizontal axis
  YAxis, // Vertical axis
} from "recharts";

// Function component bana rahe hain
// { charts } props ke through data receive karega
function RechartSetup({ charts }) {
  // Agar charts null ho ya empty ho to component kuch render nahi karega
  if (!charts || charts.length === 0) return null;

  // Chart ke colors define kar rahe hain
  // Different bars / slices ko alag color milega
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    // Tailwind class space-y-8 se charts ke darmiyan vertical spacing ayegi
    <div className="space-y-8">
      {/* charts array ko map kar rahe hain taake har chart alag render ho */}
      {charts.map((chart, index) => (
        // Har chart ke liye container
        <div
          key={index} // React ko batane ke liye unique key
          className="border border-gray-200 rounded-xl p-4 bg-white"
        >
          {/* Chart ka title show kar raha hai */}
          <h4 className="font-semibold text-gray-800 mb-3">{chart.title}</h4>

          {/* Chart ka fixed height container */}
          <div className="h-72">
            {/* ResponsiveContainer chart ko screen ke hisaab se resize karta hai */}
            <ResponsiveContainer width="100%" height="100%">
              {/* ================= BAR CHART ================= */}

              {/* Agar chart type bar ho to bar chart show hoga */}
              {chart.type === "bar" && (
                // BarChart ko data pass kar rahe hain
                <BarChart data={chart.data}>
                  {/* XAxis name field ko horizontal axis par show karega */}
                  <XAxis dataKey="name" />

                  {/* YAxis values show karega */}
                  <YAxis />

                  {/* Tooltip hover par data show karega */}
                  <Tooltip />

                  {/* Bar chart me value field ke bars banenge */}
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {/* Har bar ko color dene ke liye map */}
                    {chart.data.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* ================= LINE CHART ================= */}

              {/* Agar chart type line ho to line chart show hoga */}
              {chart.type === "line" && (
                // LineChart ko data mil raha hai
                <LineChart data={chart.data}>
                  {/* Horizontal axis */}
                  <XAxis dataKey="name" />

                  {/* Vertical axis */}
                  <YAxis />

                  {/* Hover par data show karega */}
                  <Tooltip />

                  {/* Line chart ki line */}
                  <Line
                    type="monotone" // smooth line banata hai
                    dataKey="value" // value field ko use karega
                    stroke="#6366f1" // line ka color
                    strokeWidth={3} // line ki thickness
                  />
                </LineChart>
              )}

              {/* ================= PIE CHART ================= */}

              {/* Agar chart type pie ho to pie chart show hoga */}
              {chart.type === "pie" && (
                <PieChart>
                  {/* Hover tooltip */}
                  <Tooltip />

                  {/* Pie chart data */}
                  <Pie
                    data={chart.data} // data pass
                    dataKey="value" // value slice size decide karegi
                    nameKey="name" // name label ke liye
                    outerRadius={100} // pie ka size
                    label // labels show karega
                  >
                    {/* Har slice ko color dena */}
                    {chart.data.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component export kar rahe hain taake dusri files me use ho sake
export default RechartSetup;
