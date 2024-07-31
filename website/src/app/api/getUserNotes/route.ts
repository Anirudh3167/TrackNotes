import { GetUserNotes } from "@/db/Users";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.name) return Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });

    const notesData = await GetUserNotes({ username: session.user.name });
    return Response.json({ status: true, notes: notesData });
}