import express from "express";
import { addSchool, listSchools } from "../controller/school.controller.js";

const router = express.Router();

// add school route
router.post("/addSchool", addSchool);

//list schools route
router.get("/listSchools", listSchools);

export default router;
