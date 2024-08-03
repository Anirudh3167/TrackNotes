import { connectToDatabase } from "./HelperFunctions";
import NotesModel from "./Models/Notes";


export async function GetNotes({ noteId } : {noteId : string}) {
    await connectToDatabase();
    return await NotesModel.find({ noteId });
}

export async function AddNote({ content, noteId, username } : {content : string, noteId : string, username : string}) {
    await connectToDatabase();

    // Decide whether to add or update
    if ((await GetNotes({ noteId }))?.length > 0)
        await NotesModel.updateOne({ noteId }, { $set: { content } });
    else
        await NotesModel.create({ content, noteId, access: 'private', author : username });

    return {status:true};
}

export async function DeleteNote({ noteId } : {noteId : string}) {
    await connectToDatabase();
    await NotesModel.deleteOne({ noteId });
}