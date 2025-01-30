import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,//spreading other objects
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).send("User not found!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("Wrong password or username!");

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      "my-secret-key"
    );

    // Destructure user info
    const { password, ...info } = user._doc;

    // Send cookie and response
    res.cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(info);

  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

// export const register=async(req,res)=>{
//     try{
//       const hash=bcrypt.hashSync(req.body.password)
//       const newUser=new User(req.body)
//       await newUser.save()
//       res.status(201).send("User created")
//     }catch(error){
//       res.status(500).send("something went wrong");
//     }

// }
