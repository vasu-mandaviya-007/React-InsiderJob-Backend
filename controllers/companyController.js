import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Jobs from "../models/Job.js";
import cloudinary from "../config/cloudinary.js";

// Register a new company
export const registerCompany = async (req, res) => {
     try {
          const { username, email, password } = req.body;

          const ImageFile = req.file;

          if (!username || !email || !password || !ImageFile) {
               console.log(username, email, password, ImageFile);
               return res
                    .status(500)
                    .json({ success: false, error: "Please Fill All the Fields" });
          }

          let companyExist = await Company.findOne({ email });

          if (companyExist) {
               return res
                    .status(500)
                    .json({ success: false, message: "Company already exists" });
          }

          let hashpass = await bcrypt.hash(password, 10);

          // const imageUpload = await cloudinary.uploader.upload(ImageFile.path)
          // ⭐ Upload image to Cloudinary → insiderjob/companies folder
          const imageUpload = await new Promise((resolve, reject) => {
               const uploadStream = cloudinary.uploader.upload_stream(
                    {
                         folder: "insiderjob/companies", // ⭐ Your new folder
                    },
                    (error, result) => {
                         if (error) reject(error);
                         else resolve(result);
                    }
               );

               uploadStream.end(ImageFile.buffer); // use buffer instead of path
          });

          const company = await Company.create({
               name: username,
               email: email,
               password: hashpass,
               image: imageUpload?.secure_url,
          });

          let token = generateToken(company._id);

          res
               .status(200)
               .json({
                    success: true,
                    companyData: company,
                    token: token,
                    message: "Company created successfully",
               });
     } catch (err) {
          return res
               .status(300)
               .json({ success: false, error: err, message: "Something went wrong" });
     }
};

// Company Login
export const loginCompany = async (req, res) => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               return res
                    .status(400)
                    .json({ success: false, message: "Email and Password are required" });
          }

          let companyExist = await Company.findOne({ email });

          if (companyExist) {
               try {
                    if (bcrypt.compare(password, companyExist.password)) {
                         let token = generateToken(companyExist._id);

                         // console.log(token)

                         res
                              .status(200)
                              .json({
                                   success: true,
                                   token: token,
                                   companyData: companyExist,
                                   message: "Company Login successfully",
                              });
                    } else {
                         return res
                              .status(400)
                              .json({ success: false, message: "Invalid Email Or Password" });
                    }
               } catch (error) {
                    return res
                         .status(400)
                         .json({ success: false, message: "Password Error", error: error });
               }
          } else {
               return res
                    .status(400)
                    .json({ success: false, message: "Company does not exist" });
          }
     } catch (error) {
          res.status(500).json({ success: false, message: "Something went wrong" });
     }
};

// Get company data
export const getCompanyData = async (req, res) => {
     try {
          const company = req.company;

          res.status(200).json({ success: true, company });
     } catch (e) {
          res
               .status(500)
               .json({
                    success: false,
                    error: e,
                    message: "Failed to Fetch Company Data",
               });
     }
};

// Post a New job
export const postJob = async (req, res) => {
     try {
          req.body.companyId = req.company._id;
          const job = new Jobs(req.body);
          await job.save();

          res.status(200).json({ success: true, message: "Job Posted successfully" });
     } catch (e) {
          res
               .status(500)
               .json({ success: false, error: e, message: "Job Posting failed" });
     }
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => { };

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
     try {
          const companyId = req.company._id;

          const jobs = await Jobs.find({ companyId });

          res
               .status(200)
               .json({
                    success: true,
                    jobsData: jobs,
                    message: "Job Fetched successfully",
               });
     } catch (e) {
          res
               .status(500)
               .json({ success: false, error: e, message: "Failed To Fetch" });
     }
};

// Change Job Application Status
export const changeJobApplicationStatus = async (req, res) => { };

// Change Job Visibility
export const changeJobVisibility = async (req, res) => {
     try {
          const { id } = req.body;

          const companyId = req.company._id;

          const job = await Jobs.findById(id);

          if (companyId.toString() === job.companyId.toString()) {
               job.visible = !job.visible;
          }

          await job.save();

          res.status(200).json({ success: true, job });
     } catch (e) {
          res.status(500).json({ success: false, error: e.message });
     }
};
