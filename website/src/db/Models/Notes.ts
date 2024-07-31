import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
    content: String,
    noteId: String,
    access: String
});

export default mongoose.models.NotesModel || mongoose.model('NotesModel', NotesSchema)