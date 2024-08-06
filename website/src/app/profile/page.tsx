"use client";
import ProfileCard from "@/components/ui/ProfileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
    const { status: sessionStatus, data: session } = useSession();
    const router = useRouter();
    useEffect(() => {if (sessionStatus === "unauthenticated") router.push('/login');}, [sessionStatus]);
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <ProfileCard user={session?.user} />
        </div>
    );
}