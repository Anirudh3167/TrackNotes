import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Notes: Array<{
    noteId: String,
    access: String,
    content: String, // only first 25 characters
    lastUpdated: String,
  }>,
  createdAt: String,
  lastUpdated: String,
});

export default mongoose.models.Users || mongoose.model('Users', UsersSchema);
