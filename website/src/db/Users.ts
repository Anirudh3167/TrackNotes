import Users from "./Models/Users";
import { connectToDatabase } from "./HelperFunctions";

export async function GetUser({ username, password } : any) {
  await connectToDatabase();
  return await Users.find({ username, password });
}

export async function RegisterUser({ username, email, password } : any) {
  await connectToDatabase();
  return await Users.create({ username, email, password, Notes: [] });
}

export async function GetUserNotes({ username } : { username : string }) {
  await connectToDatabase();
  let d = await Users.find({ username });
  return (!d || d.length === 0) ? [] : d[0].Notes;
}

export async function UserNotesExists({ username, noteId } : { username: string, noteId : string }) {
  await connectToDatabase();
  return (await GetUserNotes({ username }))
            .filter((note: any) => note.noteId === noteId).length !== 0
}

export async function UpdateUserNotes({ username, noteId, content } : { username: string, noteId : string, content : string }) {
  await connectToDatabase();
  // Decide whether to add or update
  if (await UserNotesExists({ username, noteId })) 
    await Users.updateOne({ username, "Notes.noteId": noteId },
      { $set: { "Notes.$.content": content } }
    );
  else await Users.updateOne({ username }, 
      { $push: { Notes: { noteId, access: 'private', content } } }
    );    
}

export async function UpdateUserNotesAccess({ username, noteId, access } : { username: string, noteId : string, access : string }) {
  await connectToDatabase();
  await Users.updateOne({ username, "Notes.noteId": noteId },
    { $set: { "Notes.$.access": access } }
  );
}

export async function DeleteUserNotes({ username, noteId } : { username: string, noteId : string }) {
  // Delete on both users and notes
  await connectToDatabase().then(() =>
    Users.updateOne({ username }, { $pull: { Notes: { noteId } } })
  );
}