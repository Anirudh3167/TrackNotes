import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
    content: String,
    noteId: String,
    access: String,
    lastUpdated: String,
    createdAt: String,
    author: String,
  });
  
export default mongoose.models.NotesModel || mongoose.model('NotesModel', NotesSchema)