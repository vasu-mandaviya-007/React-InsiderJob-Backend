import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const ProtectCompany = async(req,res,next) => {
     const token = req.headers.token; 
     
     if(!token){
          console.log("MiddleWareError")
          return res.status(400).json({success : false, message : "Un Authorized, Login Again"});
     }

     try {
          
          const decode = jwt.verify(token, process.env.JWT_SECRET);

          req.company = await Company.findById(decode.id).select('-password')

          next();

     } catch (error) {

          return res.status(400).json({success : false, message : "Something went wrong", error : error.message});
          
     }

}