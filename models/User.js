import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     _id: {
          type: String,
          required: true
     },
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     number : {
          type : Number,
          unique : true
     },
     city : {
          type : String,
     },
     state : {
          type : String,
     },
     country : {
          type : String,
     },
     gender : {
          type : String,
     },
     resume: {
          type: String
     },
     image: {
          type: String
     }
})

const User = mongoose.model("User", UserSchema)

export default User;