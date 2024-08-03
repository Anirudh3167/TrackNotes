import { mongoUrl } from "@/lib/constants";
import mongoose from "mongoose";

export async function connectToDatabase() {
    mongoose.connection.readyState === 0 && await mongoose.connect(mongoUrl)
  }