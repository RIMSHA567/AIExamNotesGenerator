import express from "express";
import { generateNotes } from "../controllers/generate.controller.js";
// import isAuth from "../middleware/isAuth.js";
import isAuth from "../middlewares/isAuth.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", isAuth, generateNotes);

export default notesRouter;
