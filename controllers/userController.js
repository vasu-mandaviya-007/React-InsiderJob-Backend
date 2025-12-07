
import mongoose from "mongoose";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";


export const userData = async (req, res) => {


     try {

          // Clerk Middleware automatically convert the token into auth object
          const userId = req.auth.userId
          console.log(userId);

          const user = await User.findById(userId);
          // console.log(user);

          res.json({ success: true, userData: user, message: "User Data Fetched Successfully" });

     } catch (err) {

          console.log(err);
          res.status(400).json({ success: false, error: err, message: "Failed to fetch user data" });

     }


}


export const sendJobApplication = async (req, res) => {

     try {

          const userId = req.auth.userId;
          const { jobId, companyId, fullname, email, message } = req.body;
          const ImageFile = req.file;


          const isApplied = await JobApplication.find({ JobId: jobId, userId: userId })

          if (isApplied.length > 0) {
               console.log(isApplied);
               return res.json({ success: false, message: "Already Applied" })
          }

          // Upload Image to the Cloudinary
          const imageUpload = await cloudinary.uploader.upload(ImageFile.path)

          const application = new JobApplication({
               fullname: fullname,
               email: email,
               message: message,
               resume: imageUpload?.secure_url,
               userId: userId,
               companyId: new mongoose.Types.ObjectId(companyId),
               JobId: new mongoose.Types.ObjectId(jobId),
          })

          await application.save();

          // const newapp = await application.populate("userId");

          console.log(application);

          res.status(200).json({
               success: true,
               message: "JobApplication Send Successfully",
               // data: newapp
          });

     } catch (e) {

          res.status(404).json({ success: false, error: e, message: "Failed to Send Job Application" });
          console.log(e);

     }

}


export const getUserJobApplication = async (req, res) => {

     try {

          const userId = req.auth.userId;

          console.log(userId);

          const application = await JobApplication.find({ userId })
               .populate("companyId", 'name image')
               .populate("JobId", 'title State Country')
               .exec();


          const result = application.map(application => {

               const { companyId, ...rest } = application.toObject();

               return {
                    ...rest,
                    jobTitle: application.JobId.title,
                    jobState : application.JobId.State,
                    jobCountry : application.JobId.Country,
                    companyName: application.companyId.name,
                    companyImg: application.companyId.image,
               }

          })

          res.json({ success: true, message: "Applications Fetch Successfully", applications: result })

     } catch (e) {

          console.log(e);
          res.json({ success: true, message: "Network Error", error: e })

     }

} 