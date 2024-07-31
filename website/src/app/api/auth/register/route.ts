import { GetUser, RegisterUser } from "@/db/Users";

export async function POST(req: Request) {
    const { username, email, password } = await req.json();
    let exists = await GetUser({ username, email, password });
    if (exists && exists.length > 0) return Response.json({ status: false, reason: 'User already exists' });
    await RegisterUser({ username, email, password });
    return Response.json({ status: true });
}