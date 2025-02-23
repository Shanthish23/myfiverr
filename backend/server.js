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
    await mongoose.connect("mongodb+srv://siddharth:3102@demo.vlkwr.mongodb.net/?retryWrites=true&w=majority&appName=demo")
    console.log("Connected to database")
}catch(error){
    console.log(error)
}
}

app.use(cors({
    origin: 'https://myfiverr-3b2c-8n6kg9yys-shanthishs-projects.vercel.app/', // Set your frontend URL here
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']// Allows cookies to be sent across domains
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
