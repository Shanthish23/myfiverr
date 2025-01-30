import express from  "express"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
// import gigRoute from "./routes/gig.route.js"
// import orderRoute from "./routes/order.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// if we need to write as const express=require("express")

// starting our application
const app=express()

const connect=async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/fiverr")
    console.log("Connected to database")
}catch(error){
    console.log(error)
}
}

app.use(cors({
    origin: 'http://localhost:5173', // Set your frontend URL here
    credentials: true,  // Allows cookies to be sent across domains
  }));
app.use(express.json())//only by this db accpets data from user
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
// app.use("/api/gigs",gigRoute)
// app.use("/api/orders",orderRoute)
// app.use("/api/users",userRoute)





// we have to listen a local host port
app.listen(8800,()=>{
    connect()
    console.log("server is running on port 8800")
})