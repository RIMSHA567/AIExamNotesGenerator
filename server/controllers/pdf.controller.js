import PDFDocument from "pdfkit";

// ================================
// Function: pdfDownload
// Purpose: Backend se PDF generate karna aur user ko download karwana
// ================================
export const pdfDownload = async (req, res) => {
  try {
    // Frontend se data aa raha hai (AI ka generated result)
    const { result } = req.body;

    // ================= VALIDATION =================
    // Agar result hi nahi aya to error return karo
    if (!result) {
      return res.status(400).json({ error: "No content provided" });
    }

    // ================= PDF DOCUMENT CREATE =================
    // naya PDF document banaya with margin (spacing)
    const doc = new PDFDocument({ margin: 50 });

    // ================= RESPONSE HEADERS =================
    // Browser ko bataya ja raha hai ke yeh PDF file hai
    res.setHeader("Content-Type", "application/pdf");

    // Yeh header force karta hai download hone ke liye
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ExamNotesAI.pdf"',
    );

    // PDF ka output direct response (browser) me pipe ho raha hai
    doc.pipe(res);

    // ================= TITLE =================
    // Center me title likha ja raha hai
    doc.fontSize(20).text("ExamNotes AI", { align: "center" });
    doc.moveDown(); // thori space

    // ================= IMPORTANCE =================
    // Topic ki importance show ho rahi hai
    doc.fontSize(14).text(`Importance: ${result.importance || ""}`);
    doc.moveDown();

    // ================= SUB TOPICS =================
    doc.fontSize(16).text("Sub Topics");
    doc.moveDown(0.5);

    // Agar subTopics exist karte hain to loop chalao
    if (result.subTopics) {
      // Object.entries → object ko loop karne ke liye use hota hai
      // star = key (e.g. 5*, 4*)
      // topics = us key ke andar array
      Object.entries(result.subTopics).forEach(([star, topics]) => {
        // Star heading print ho rahi hai
        doc.fontSize(13).text(`${star} Topics:`);

        // Har topic ko list ki form me print karo
        topics.forEach((t) => {
          doc.fontSize(12).text(`- ${t}`);
        });

        doc.moveDown(0.5); // spacing
      });
    }

    doc.moveDown();

    // ================= NOTES =================
    doc.fontSize(16).text("Notes");
    doc.moveDown(0.5);

    // Notes print ho rahe hain
    // replace(/\*/g, "") → agar * symbols hain to remove kar do
    doc.fontSize(12).text((result.notes || "").replace(/\*/g, ""));

    doc.moveDown();

    // ================= REVISION =================
    doc.fontSize(16).text("Revision Points");
    doc.moveDown(0.5);

    // Har revision point ko bullet list me print karo
    if (result.revisionPoints) {
      result.revisionPoints.forEach((p) => {
        doc.fontSize(12).text(`- ${p}`);
      });
    }

    doc.moveDown();

    // ================= QUESTIONS =================
    doc.fontSize(16).text("Important Questions");
    doc.moveDown(0.5);

    // ---------- SHORT QUESTIONS ----------
    doc.fontSize(13).text("Short Questions:");

    // optional chaining (?.) use ki gayi hai taake error na aaye agar data missing ho
    result?.questions?.short?.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });

    doc.moveDown(0.5);

    // ---------- LONG QUESTIONS ----------
    doc.fontSize(13).text("Long Questions:");
    result?.questions?.long?.forEach((q) => {
      doc.fontSize(12).text(`- ${q}`);
    });

    doc.moveDown(0.5);

    // ================= END PDF =================
    // PDF close karna zaroori hai warna file complete nahi hogi
    doc.end();
  } catch (error) {
    console.log(error);

    // Agar koi error aaye to server error return karo
    res.status(500).json({ error: "PDF generation failed" });
  }
};
