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

export async function UpdateUserNotes({ username, noteId, content, timestamp, newNote } : { username: string, noteId : string, content : string, timestamp : number, newNote : boolean }) {
  await connectToDatabase();
  console.log("New Note: ", newNote);
  // Decide whether to add or update
  if (newNote) await Users.updateOne({ username }, 
    { $push: { Notes: { noteId, access: 'private', content, lastUpdated: timestamp } } });
  else await Users.updateOne({ username, "Notes.noteId": noteId },
      { $set: { "Notes.$.content": content, "Notes.$.lastUpdated": timestamp } }
    );
}

export async function UpdateUserNotesAccess({ username, noteId, access } : { username: string, noteId : string, access : string }) {
  await connectToDatabase();
  let r = await Users.updateOne({ username, "Notes.noteId": noteId },
    { $set: { "Notes.$.access": access } }
  );
  console.log("From UpdateUserNotesAccess: ", r);
}

export async function DeleteUserNotes({ username, noteId } : { username: string, noteId : string }) {
  // Delete on both users and notes
  await connectToDatabase();
  await Users.updateOne({ username }, { $pull: { Notes: { noteId } } })
}