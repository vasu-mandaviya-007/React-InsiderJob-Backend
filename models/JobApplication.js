import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({

     fullname: {
          type: String, required: true
     },
     email: {
          type: String, required: true
     },
     message: {
          type: String
     },
     resume: {
          type: String, required: true
     },
     status: {
          type: String, default: "pending"
     },
     userId: {
          type: String,
          required: true
     },
     companyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Company',
          required: true
     },
     JobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Jobs',
          required: true
     },
     Date: {
          type: Date,
          default: () => new Date()
     }

}, {
     timestamps: true,
})

const JobApplication = mongoose.model("JobApplication", ApplicationSchema);

export default JobApplication;