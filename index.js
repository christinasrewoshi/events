import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.router.js';
import eventRoutes from './routes/event.router.js';


const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get("/",(req,res)=>{
    res.send("Backend is Running!")
})

mongoose.connect(process.env.MONGO_URI).then(
    ()=>{console.log("MongoDB is Connected.")})
    .catch((error)=>{console.log(error)})


app.listen(port,()=>{
    console.log(`Server is running in http://localhost:${port}`)

})