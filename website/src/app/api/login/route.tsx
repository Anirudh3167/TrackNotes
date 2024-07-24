export async function POST(req: Request) {
    if (req.method !== 'POST')
        return Response.json({ status: false, reason: 'Only POST requests are allowed' }, 
                             { status: 405 });
       
    // Simple authentication logic
    const { email, password } = await req.json();
    if (email === 'anirudhmukkamala@gmail.com' && password === 'anirudh')
        return Response.json({ status: true });
    return Response.json({ status: false, reason: 'Invalid credentials' },{ status: 401 });
}

export async function GET() {
    return Response.json({ status: true });
}