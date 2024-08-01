import { DeleteNote } from "@/db/Notes";
import { DeleteUserNotes } from "@/db/Users";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    const { noteId } = await req.json();
    if (!noteId) return Response.json({ status: false, reason: 'No id provided' }, { status: 400 });

    let userSession = await getServerSession();
    await DeleteNote({ noteId }).then(() => {
        let username = '';
        if (!userSession || !userSession.user || !userSession.user.name) 
            return Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });
        else username = userSession.user.name;

        DeleteUserNotes({ username, noteId });
    });
    return Response.json({ status: true });
}