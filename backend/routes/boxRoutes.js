import express from "express";
import { getBoxes } from "../controllers/boxController.js";

const router = express.Router();

router.get("/boxes", getBoxes);



export default router;
