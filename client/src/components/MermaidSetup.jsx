// ==============================
// React + Mermaid Setup File
// ==============================

// React hooks import
// useEffect → jab diagram change ho to render dobara ho
// useRef → HTML div ka reference lene ke liye
import React, { useEffect, useRef } from "react";

// Mermaid library import (text → diagram)
import mermaid from "mermaid";

// Mermaid initialize
mermaid.initialize({
  startOnLoad: false, // auto render band (hum manually karenge)
  theme: "default", // simple theme
});

// ==============================
// Function: cleanMermaidChart
// Purpose: diagram ko safe aur valid banana
// ==============================
const cleanMermaidChart = (diagram) => {
  // Agar diagram empty hai to empty return
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n") // Windows line breaks fix
    .trim(); // extra spaces remove

  // Agar "graph" start me nahi hai
  // to automatically add kar do
  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`; // TD = top-down flow
  }

  return clean;
};

// ==============================
// Function: autoFixBadNodes
// Purpose: duplicate labels ko fix karna
// ==============================
const autoFixBadNodes = (diagram) => {
  let index = 0; // node numbering

  // Map → track karega konsa label already use ho chuka hai
  const used = new Map();

  // [] ke andar jo labels hain unko process karo
  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim(); // label clean

    // Agar same label pehle aa chuka hai
    // to uska same node reuse karo
    if (used.has(key)) {
      return used.get(key);
    }

    // warna new node banao
    index++;

    const id = `N${index}`; // unique ID (N1, N2...)
    const node = `${id}[${key}]`; // final node format

    // Map me save karo
    used.set(key, node);

    return node;
  });
};

// ==============================
// Component: MermaidSetup
// Purpose: diagram ko screen par render karna
// ==============================
function MermaidSetup({ diagram }) {
  // div ka reference
  const containerRef = useRef(null);

  useEffect(() => {
    // Agar diagram nahi ya div ready nahi
    // to render mat karo
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        // Purana diagram remove
        containerRef.current.innerHTML = "";

        // Unique ID generate (har render ke liye)
        const uniqueId =
          "mermaid-" + Math.random().toString(36).substring(2, 9);

        // Step 1: clean diagram
        // Step 2: duplicate nodes fix
        const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

        // Mermaid text ko SVG diagram me convert karega
        const { svg } = await mermaid.render(uniqueId, safeChart);

        // SVG ko div me insert kar do
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);
      }
    };

    // Function call
    renderDiagram();

    // Jab diagram change ho → dobara render
  }, [diagram]);

  // ================= UI =================
  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      {/* Yahan final diagram show hoga */}
      <div ref={containerRef}></div>
    </div>
  );
}

// Export component
export default MermaidSetup;
