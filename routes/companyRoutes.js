import express from "express";
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { ProtectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany)

// Company Login
router.post("/login", loginCompany)

// Get Company Data
router.post("/companyData",ProtectCompany, getCompanyData)

// Post a Job 
router.post("/post-job",ProtectCompany, postJob);

// Get Applicants Data of Company
router.get("/applicants",ProtectCompany, getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs",ProtectCompany, getCompanyPostedJobs);

// Change Applications Status
router.post("/change-status",ProtectCompany, changeJobApplicationStatus);

// Change Applications Visibility
router.post("/change-visibility",ProtectCompany, changeJobVisibility);

export default router;