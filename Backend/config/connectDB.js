import mongoose from "mongoose";


export default async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/VanLife")
        console.log("MongoDB connected! [mongoose]");
    }
    catch (e) {
        console.error("MongoDB connection failed!!", e);
        process.exit(1);
    }
}