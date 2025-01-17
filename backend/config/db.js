import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to mongodb database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongodb ${error}`);
    }
}

export default connectDB;