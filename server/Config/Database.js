import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb://127.0.0.1:27017/pro-mange`
    );
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(`Error :${error.message}`);
  }
};
