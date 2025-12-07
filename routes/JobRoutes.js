import express from "express";
import { getJobs, getSingleJob } from "../controllers/jobController.js";
import upload from "../config/multer.js";

const router = express.Router();

// Route to get all jobs data 
router.post("/get-all-jobs", getJobs);

// Route to get a single job by ID
router.get("/:id", getSingleJob);

// Route to get Send Job Application




export default router;