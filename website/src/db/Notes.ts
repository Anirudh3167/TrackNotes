import { connectToDatabase } from "./HelperFunctions";
import NotesModel from "./Models/Notes";


export async function GetNotes({ noteId } : {noteId : string}) {
    await connectToDatabase();
    return await NotesModel.findOne({ noteId });
}

export async function AddNote({ content, noteId, username } : {content : string, noteId : string, username : string}) {
    await connectToDatabase();
    let timestamp = Date.now();

    // Updates if noteId already exists Else creates
    await NotesModel.updateOne({ noteId }, { 
        $set: { content, lastUpdated : timestamp }, 
        $setOnInsert: { noteId, createdAt : timestamp, access: 'private', author : username }, 
        },{ upsert: true });

    return {status:true, timestamp };
}

export async function DeleteNote({ noteId } : {noteId : string}) {
    await connectToDatabase();
    await NotesModel.deleteOne({ noteId });
}

export async function UpdateAccess({ noteId, access } : {noteId : string, access : string}) {
    await connectToDatabase();
    await NotesModel.updateOne({ noteId }, { $set: { access } });
}