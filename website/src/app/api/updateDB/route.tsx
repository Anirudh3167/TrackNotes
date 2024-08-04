// import { connectToDatabase } from "@/db/HelperFunctions";
// import Notes from "@/db/Models/Notes";
// import Users from "@/db/Models/Users";

export async function GET(req: Request) {
    // await connectToDatabase();

    // let currDate = Date.now();
    // let notesObj = { lastUpdated: currDate, createdAt: currDate, author: 'abc' };
    // await Notes.updateMany({}, { $set: notesObj });

    // let usersObj = { lastUpdated: currDate, createdAt: currDate, 'Notes.$[].lastUpdated': currDate };
    // await Users.updateMany({}, { $set: usersObj });

    // console.log("Data Updated Successfully")

    // return Response.json({ status: true });
    return Response.json({status: false, Reason: "Only Used for triggering the database updates"})
}