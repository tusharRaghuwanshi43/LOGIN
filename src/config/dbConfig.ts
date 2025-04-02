import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri =
            process.env.MONGODB_URI || "mongodb://localhost:27017/CURD1";
        await mongoose.connect(uri, {});
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
