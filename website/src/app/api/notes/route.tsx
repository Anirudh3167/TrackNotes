import { limitStringLength } from '@/db/HelperFunctions';
import { AddNote, GetNotes } from '@/db/Notes';
import { UpdateUserNotes } from '@/db/Users';
import { getUserName } from '@/lib/severUtils';

// Create + Update Notes
export async function POST(req: Request) {
    // Authenticate   
    let username = await getUserName();
    if (!username) return Response.json({ status: false, reason: 'Unauthorized' });
    
    // Get the data + ID
    const { content, noteId } = await req.json();
    let id: string = (noteId && noteId !== '') ? noteId : Date.now().toString();  // Primary key

    // First add the notes then to the user
    await AddNote({ content, noteId: id, username }).then((res)=>{
        res.status && UpdateUserNotes({ username, noteId: id, timestamp: res.timestamp, 
            newNote: id !== noteId, content : limitStringLength(content, 25) });
    });
    
    return Response.json({ status: true, noteId: id });
}

export async function GET(req: Request) {
    // Get the ID
    const id = (new URL(req.url)).searchParams.get('noteId');
    if (!id) return Response.json({ status: false, reason: 'No id provided' });
    
    // Get the notes
    const Note = await GetNotes({ noteId: id });
    if (!Note) return Response.json({ status: false, reason: 'Note not found' });

    // Authorize  
    if (Note.access.toLowerCase() === 'private') {
        let username = await getUserName();
        if (!username || username !== Note.author) 
            return Response.json({ status: false, reason: 'Unauthorized' });
    }

    return Response.json({ status: true, Note });
}