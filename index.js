import express from "express";
import mongoose from "mongoose";
import hotelsRoute from "./routes/hotel.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js"
import roomRoute from "./routes/rooms.js"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB")
        
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

// middlwares
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/hotels", hotelsRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/room", roomRoute)

app.get("/test", (req, res) => {
    return res.status(200).json("hrllo world")
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something wrong";
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    });
})

app.listen(8800, ()=> {
    connect()
    console.log("connected to bakcend")
})