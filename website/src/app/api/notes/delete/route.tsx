import { DeleteNote } from "@/db/Notes";
import { DeleteUserNotes } from "@/db/Users";
import { getUserName } from "@/lib/severUtils";

export async function POST(req: Request) {
    // Get the ID
    const { noteId, author } = await req.json();
    if (!noteId) return Response.json({ status: false, reason: 'No id provided' });

    // Authorize
    let username = await getUserName();
    if (!username || username !== author) return Response.json({ status: false, reason: 'Unauthorized' });

    // Delete Notes
    await DeleteNote({ noteId }).then(() => {DeleteUserNotes({ username, noteId })});

    return Response.json({ status: true });
}