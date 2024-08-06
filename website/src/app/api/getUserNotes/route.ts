import { GetUserNotes } from "@/db/Users";
import { getUserName } from "@/lib/severUtils";

export async function GET(req: Request) {
    const username = await getUserName();
    return username ?
        Response.json({ status: true, notes: await GetUserNotes({ username }) })
    :
        Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });
}