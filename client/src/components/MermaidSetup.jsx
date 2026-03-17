// React se 2 cheezein import kar rahe hain:
// useEffect → jab data change ho to function run karne ke liye
// useRef → HTML element ko reference dene ke liye
import React, { useEffect, useRef } from "react";

// Mermaid library import kar rahe hain
// Yeh library text ko diagram (flowchart etc) me convert karti hai
import mermaid from "mermaid";

// Mermaid library ko initialize kar rahe hain
// Matlab library ko start kar rahe hain
mermaid.initialize({
  // Page load par automatically diagram na banaye
  // Hum khud manually render karenge
  startOnLoad: false,

  // Diagram ka theme / design style
  theme: "default",
});

// ==============================
// Diagram ko clean karne wala function
// ==============================
const cleanMermaidChart = (diagram) => {
  // Agar diagram empty hai to empty string return kar do
  if (!diagram) return "";

  // Diagram text ko clean kar rahe hain
  let clean = diagram

    // Windows line breaks ko normal bana raha hai
    .replace(/\r\n/g, "\n")

    // Extra spaces remove kar raha hai
    .trim();

  // Agar diagram "graph" se start nahi ho raha
  // to automatically "graph TD" add kar do
  // (TD ka matlab Top Down flow)
  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  // Clean diagram return kar rahe hain
  return clean;
};

// ==============================
// Galat nodes ko auto fix karne wala function
// ==============================
const autoFixBadNodes = (diagram) => {
  // Node numbering start karne ke liye variable
  let index = 0;

  // Diagram ke andar jo labels [] me hote hain unko fix kar rahe hain
  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    // Har node ka index barha rahe hain
    index++;

    // Node ko ek ID de rahe hain
    // Example: N1[Start]
    return `N${index}[${label}]`;
  });
};

// ==============================
// Main React Component
// ==============================
function MermaidSetup({ diagram }) {
  // useRef ek reference banata hai
  // Yeh reference neeche wale div ko point karega
  // Jahan final diagram show hoga
  const containerRef = useRef(null);

  // useEffect tab run hota hai
  // jab component load ho ya diagram change ho
  useEffect(() => {
    // Agar diagram nahi mila
    // ya div ready nahi hai
    // to code aage run nahi karega
    if (!diagram || !containerRef.current) return;

    // Diagram render karne wala function
    const renderDiagram = async () => {
      try {
        // Pehle container empty kar rahe hain
        // taake purana diagram remove ho jaye
        containerRef.current.innerHTML = "";

        // Har diagram ke liye ek unique ID bana rahe hain
        // Math.random random string generate karta hai
        const uniqueId =
          "mermaid-" + Math.random().toString(36).substring(2, 9);

        // Diagram ko safe aur clean bana rahe hain
        // Pehle clean function run hoga
        // phir autoFixBadNodes run hoga
        const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

        // Mermaid library ko diagram ka text de rahe hain
        // Mermaid is text ko SVG diagram me convert karega
        const { svg } = await mermaid.render(uniqueId, safeChart);

        // Jo SVG diagram bana hai
        // usko HTML div ke andar show kar rahe hain
        containerRef.current.innerHTML = svg;
      } catch (error) {
        // Agar diagram banate waqt error aaye
        // to console me error print karega
        console.error("Mermaid render failed:", error);
      }
    };

    // Diagram render karne wala function call kar rahe hain
    renderDiagram();

    // Agar diagram change ho jaye
    // to useEffect dobara run hoga
  }, [diagram]);

  // ==============================
  // UI part (jo screen par dikhega)
  // ==============================
  return (
    // Outer container (sirf styling ke liye)
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      {/* Yeh actual div hai jahan diagram show hoga */}

      {/* ref lagane se React ko pata hai
      ke diagram isi div ke andar insert karna hai */}

      <div ref={containerRef}></div>
    </div>
  );
}

// Component export kar rahe hain
// taake project ki dusri files me use ho sake
export default MermaidSetup;
