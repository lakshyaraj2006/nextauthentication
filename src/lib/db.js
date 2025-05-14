import mongoose from "mongoose";
import { config } from "./config-env";

export const connectDb = async () => {
    if (mongoose.connections[0].readyState) {
        return true;
    }

    await mongoose.connect(config.MONGODB_URI);
    process.env.NODE_ENV !== "production" && console.log("Connected to database");
}
