import { UpdateAccess } from "@/db/Notes";
import { UpdateUserNotesAccess } from "@/db/Users";
import { getUserName } from "@/lib/severUtils";

export async function POST(req: Request) {
    // Get the data
    const { noteId, author, access } = await req.json();
    if (!noteId) return Response.json({ status: false, reason: 'No id provided' });
    if (!access) return Response.json({ status: false, reason: 'No access provided' });
    
    // Authorize
    let username = await getUserName();
    if (!username || username !== author) return Response.json({ status: false, reason: 'Unauthorized' });

    // Update the access
    await UpdateAccess({ noteId, access }).then(() => {UpdateUserNotesAccess({ username, noteId, access })});
    return Response.json({ status: true });   
}