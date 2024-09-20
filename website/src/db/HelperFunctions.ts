import { mongoUrl } from "@/lib/constants";
import mongoose from "mongoose";

export async function connectToDatabase() {
    mongoose.connection.readyState === 0 && await mongoose.connect(mongoUrl)
  }

export const limitStringLength = (str: string, limit = 25) => str.slice(0, limit) + (str.length > limit ? '...' : '');