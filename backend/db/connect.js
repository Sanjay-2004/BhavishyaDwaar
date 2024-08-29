import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

export default connectDB;
