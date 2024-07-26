import { getServerSession } from "next-auth"

export default function ServerSession() {
    const session = getServerSession();
    return (
        <h1 className="text-3xl bg-black w-full h-full items-center justify-center">{JSON.stringify(session)}</h1>
    )
}