import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
    });
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
}
