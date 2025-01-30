import User from "../models/user.model.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const deleteUser = async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (req.userId !== user._id.toString()) {
//     return res.status(403).send( "You can delete only your account!");
//   }
//   await User.findByIdAndDelete(req.params.id);
//   res.status(200).send("deleted.");
// };
// export const getUser = async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).send(user);
// };

export const deleteUser=async(req , res)=>{
  const user =await User.findById(req.params.id)
  // const token=req.header("Authorization")?.split(" ")[1];
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).send("You are not authenticated")
  jwt.verify(token,"my-secret-key",async(err,payload)=>{
    if(payload.id!==user._id.toString()){
      // console.log(payload.id)
      return res.status(403).send("You can delete only your account")
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send("deleted successfully")
  })
}

