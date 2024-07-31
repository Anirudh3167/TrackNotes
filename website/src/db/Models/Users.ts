import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Notes: Array<{
    noteId: String,
    access: String,
    content: String, // only first 25 characters
  }>,
});

export default mongoose.models.Users || mongoose.model('Users', userSchema);
