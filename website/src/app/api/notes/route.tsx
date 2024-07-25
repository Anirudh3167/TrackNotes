import { promises as fs } from 'fs';

// Creates and updates notes
export async function POST(req: Request) {
    if (req.method !== 'POST')
        return Response.json({ status: false, reason: 'Only POST requests are allowed' },
                             { status: 405 });
    
    const { content, noteId } = await req.json();
    let id = (noteId && noteId !== '') ? noteId : Date.now().toString();  // Primary key

    const folderPath = `${process.cwd()}\\uploads`;
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(folderPath + `\\${id}.md`, content, { encoding: 'utf8' });

    return Response.json({ status: true, noteId: id });
}

export async function GET(req: Request) {
    if (req.method !== 'GET')
        return Response.json({ status: false, reason: 'Only GET requests are allowed' },
                             { status: 405 });

    const id = (new URL(req.url)).searchParams.get('noteId');
    if (!id)
        return Response.json({ status: false, reason: 'No id provided' }, { status: 400 });

    const folderPath = `${process.cwd()}/uploads`;
    const file = await fs.readFile(folderPath + `/${id}.md`, { encoding: 'utf8' });
    return Response.json({ status: true, content: file });
}