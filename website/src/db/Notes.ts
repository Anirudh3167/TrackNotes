import { connectToDatabase } from "./HelperFunctions";
import NotesModel from "./Models/Notes";


export async function GetNotes({ noteId } : {noteId : string}) {
    await connectToDatabase();
    return await NotesModel.find({ noteId });
}

export async function AddNote({ content, noteId, username } : {content : string, noteId : string, username : string}) {
    await connectToDatabase();
    let timestamp = Date.now();

    // Decide whether to add or update
    if ((await GetNotes({ noteId }))?.length > 0)
        await NotesModel.updateOne({ noteId }, { $set: { content, lastUpdated : timestamp } });
    else
        await NotesModel.create({ content, noteId, access: 'private', author : username, lastUpdated : timestamp, createdAt : timestamp });

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