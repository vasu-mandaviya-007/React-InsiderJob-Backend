import express from "express";
import { getUserJobApplication, sendJobApplication, userData } from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/userData", userData);

router.post("/sendApplication", userData);

router.post("/send-job-application", upload.single("image"), sendJobApplication);

router.post("/getUserJobApplication",getUserJobApplication)

export default router;