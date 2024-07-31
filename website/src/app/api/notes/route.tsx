import { AddNote, GetNotes } from '@/db/Notes';
import { GetUserNotes, UpdateUserNotes } from '@/db/Users';
import { getServerSession } from 'next-auth';
// Vercel allows only /tmp directory files to be editable. (This is a temporary solution)

// Creates and updates notes
export async function POST(req: Request) {
    if (req.method !== 'POST')
        return Response.json({ status: false, reason: 'Only POST requests are allowed' },
                             { status: 405 });
    
    let userSession = await getServerSession();
    let username = '';
    if (!userSession || !userSession.user || !userSession.user.name) 
        return Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });
    else username = userSession.user.name;

    const { content, noteId } = await req.json();
    let id: string = (noteId && noteId !== '') ? noteId : Date.now().toString();  // Primary key

    // First add the notes then to the user
    await AddNote({ content, noteId: id, username }).then(()=>{
        if (id !== noteId) UpdateUserNotes({ username, noteId: id, 
            content : content.length > 25 ? content.slice(0, 25) + "..." : content.slice(0, 25) });
    });
    
    console.log("Id from POST: ", id);
    return Response.json({ status: true, noteId: id });
}

export async function GET(req: Request) {
    if (req.method !== 'GET')
        return Response.json({ status: false, reason: 'Only GET requests are allowed' },
                             { status: 405 });

    const id = (new URL(req.url)).searchParams.get('noteId');
    if (!id)
        return Response.json({ status: false, reason: 'No id provided' }, { status: 400 });

    // Check if the user can view this or not by user.notes
    const session = await getServerSession();
    let userSession = null;
    let userNotes = [];

    if (session) userSession = session.user;
    if (userSession && userSession.name) userNotes = await GetUserNotes({ username: userSession.name });
    if (userNotes.filter((note: any) => note.noteId === id).length > 0) {
        const Note = await GetNotes({ noteId: id });
        if (!Note || Note.length === 0) return Response.json({ status: false, reason: 'Note not found' }, { status: 404 });
        return Response.json({ status: true, Note:Note[0] });
    }

    return Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });
}