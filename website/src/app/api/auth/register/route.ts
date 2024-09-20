import { GetUser, RegisterUser } from "@/db/Users";

export async function POST(req: Request) {
    const { username, email, password } = await req.json();

    if (!username || !email || !password)
        return Response.json({ status: false, reason: 'All fields are required' });

    let userExists = await GetUser({ username, email, password });
    if (!userExists) {
        await RegisterUser({ username, email, password })
        return Response.json({ status: true });
    }

    return Response.json({ status: false, reason: 'User already exists' });
}