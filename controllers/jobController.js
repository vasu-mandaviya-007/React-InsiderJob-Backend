import mongoose from "mongoose";
import Applications from "../models/JobApplication.js";
import Jobs from "../models/Job.js";


// Get All Jobs

export const getJobs = async (req, res) => {

     try {

          const jobs = await Jobs.find({ visible: true })
               .populate({ path: 'companyId', select: '-password' })

          res.status(200).json({ success: true, message: "Job Fetched Successfully", jobs: jobs });

     } catch (e) {

          res.status(404).json({ success: false, error: e, message: "Failed to Fetch Jobs" });
          console.log(e);

     }

}


// Get a Single Job 

export const getSingleJob = async (req, res) => {

     try {

          const { id } = req.params;

          const job = await Jobs.findById(id)
               .populate({ path: 'companyId', select: '-password' })


          if (!job) {
               return res.status(400).json({ success: false, message: "Job not found" });
          }

          res.status(200).json({ success: true, message: "Job Fetched Successfully", job });

     } catch (e) {

          res.status(400).json({ success: false, error: e, message: "Failed to Fetch Jobs" });
          console.log(e);

     }

}



