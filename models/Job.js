import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true
     },
     JobDescription: {
          type: String,
          required: true
     },
     Category: {
          type: String,
     },
     JobType: {
          type: [String]
     },
     EmployementType: {
          type: String
     },
     Country: {
          type: String
     },
     State: {
          type: String
     },
     City: {
          type: String
     },
     Salary: {
          type: [Number]
     },
     date: {
          type: Date,
          default: () => new Date()
     },
     lastDateToApply: {
          type: Date
     },
     Email: {
          type: String
     },
     PhoneNo: {
          type: String
     },
     Address: {
          type: String
     },
     visible: {
          type: Boolean,
          default: true
     },
     companyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Company',
          required: true
     }
})

const Jobs = mongoose.model("Jobs", JobSchema);

export default Jobs;