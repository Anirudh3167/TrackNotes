import NotesModel from "./Models/Notes";
import mongoose from "mongoose";

export async function GetNotes({ noteId } : {noteId : string}) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '');
    let d = await NotesModel.find({ noteId });
    console.log(d);
    return d;
}

export async function AddNote({ content, noteId, username } : {content : string, noteId : string, username : string}) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '');

    let exists = await GetNotes({ noteId });
    if (exists && exists.length > 0) NotesModel.updateOne({ noteId }, { $set: { content } });
    else NotesModel.create({ content, noteId, access: 'private', author : username });
    return {status:true};
}