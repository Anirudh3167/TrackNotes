import mongoose from "mongoose";
import Users from "./Models/Users";


let mongoUrl = process.env.MONGODB_URL || '';
console.log("MongoDB URL: ", mongoUrl);
console.log("MongoDB URI: ", process.env.MONGODB_URI || '');

export async function GetUser({ username, email, password } : any) {
  // Check based on unique username for now.
  console.log("GetUser: ");
  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.log("From GET USER: ",error);
  }
  let d = await Users.find({ username, password });
  console.log(d);
  return d;
}

export async function RegisterUser({ username, email, password } : any) {
  console.log("RegisterUser: ");
  await mongoose.connect(mongoUrl);
  
  const d = await Users.create({ username, email, password, Notes: [] });
  console.log(d);
  return d;
}

export async function GetUserNotes({ username } : { username : string }) {
  console.log("GetUserNotes: ");
  console.log("Connecting to DB with URL: ", mongoUrl);
  await mongoose.connect(mongoUrl);
  let d = await Users.find({ username });
  if (!d || d.length === 0) return [];
  return d[0].Notes;
}

export async function UpdateUserNotes({ username, noteId, content } : { username: string, noteId : string, content : string }) {
  await mongoose.connect(mongoUrl);
  let d = null;
  if ((await GetUserNotes({ username })).filter((note: any) => note.noteId === noteId).length === 0)
    d = await Users.updateOne({ username }, { $push: { Notes: { noteId, access: 'private', content } } });
  else
    d = await Users.updateOne(
      { username, "Notes.noteId": noteId },
      { $set: { "Notes.$.content": content } }
    );
  console.log("User Notes Updated");
  console.log(d);
}

export async function DeleteUserNotes({ username, noteId } : { username: string, noteId : string }) {
  await mongoose.connect(mongoUrl);
  let d = await Users.updateOne({ username }, { $pull: { Notes: { noteId } } });
  console.log("User Notes Deleted");
  console.log(d);
}