import { getServerSession } from "next-auth";

export async function getUserName() {
    const session = await getServerSession();
    return session?.user?.name;
}