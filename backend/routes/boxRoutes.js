import express from "express";
import { getBoxes } from "../controllers/boxController.js";

const router = express.Router();

router.get("/boxes", getBoxes);
// router.post("/tasks", add);
// router.delete("/tasks/:id", deleteTask);


export default router;
