import { GetUserNotes } from "@/db/Users";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const username = (await getServerSession())?.user?.name;
    return username ?
        Response.json({ status: true, notes: await GetUserNotes({ username }) })
    :
        Response.json({ status: false, reason: 'Unauthorized' }, { status: 401 });
}