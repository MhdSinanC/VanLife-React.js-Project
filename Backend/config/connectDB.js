import mongoose from "mongoose";


export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected! [mongoose]");
    }
    catch (e) {
        console.error("MongoDB connection failed!!", e);
        process.exit(1);
    }
}