import Notes from "../models/notes.model.js";

// ================= GET ALL NOTES =================
export const getMyNotes = async (req, res) => {
  try {
    console.log("get my notes function chlr ra");
    console.log(req);
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode IncludeDiagram IncludeChart content createdAt",
      )
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ error: "Notes not found" });
    }

    // Map fields to lowercase for frontend consistency
    const mappedNotes = notes.map((n) => ({
      _id: n._id,
      topic: n.topic,
      classLevel: n.classLevel,
      examType: n.examType,
      revisionMode: n.revisionMode,
      includeDiagram: n.IncludeDiagram,
      includeChart: n.IncludeChart,
      content: n.content,
      createdAt: n.createdAt,
    }));

    return res.status(200).json(mappedNotes);
  } catch (error) {
    return res.status(500).json({ message: `getMyNotes error ${error}` });
  }
};

// ================= GET SINGLE NOTE =================
export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({ error: "Notes not found" });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      classLevel: notes.classLevel,
      examType: notes.examType,
      revisionMode: notes.revisionMode,
      includeDiagram: notes.IncludeDiagram,
      includeChart: notes.IncludeChart,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `getSingleNotes error ${error}` });
  }
};
